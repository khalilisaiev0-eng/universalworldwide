import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-07-30.basil',
});

// Define the donation request interface
interface DonationRequest {
  amount: number;
  currency: string;
  donationType: string;
  donorInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    postalCode: string;
  };
}

export async function POST(request: Request) {
  try {
    // Check for Stripe API key first
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Missing Stripe secret key. Please set the STRIPE_SECRET_KEY environment variable.');
      return NextResponse.json(
        { error: 'Stripe secret key is not configured' },
        { status: 500 }
      );
    }
    
    const data: DonationRequest = await request.json();
    const { amount, currency, donationType, donorInfo } = data;

    // Validation
    if (!amount || amount < 100) { // minimum amount is $1.00
      return NextResponse.json(
        { error: 'Amount must be at least $1.00' },
        { status: 400 }
      );
    }

    // Create customer if donor info is provided
    let customerId: string | undefined;
    if (donorInfo?.email) {
      try {
        // Check if customer already exists
        const customers = await stripe.customers.list({
          email: donorInfo.email,
          limit: 1,
        });

        if (customers.data.length > 0) {
          // Update existing customer
          customerId = customers.data[0].id;
          await stripe.customers.update(customerId, {
            name: `${donorInfo.firstName} ${donorInfo.lastName}`,
            address: donorInfo.postalCode ? {
              country: donorInfo.country,
              postal_code: donorInfo.postalCode,
            } : undefined,
          });
        } else {
          // Create new customer
          const customer = await stripe.customers.create({
            email: donorInfo.email,
            name: `${donorInfo.firstName} ${donorInfo.lastName}`,
            address: donorInfo.postalCode ? {
              country: donorInfo.country,
              postal_code: donorInfo.postalCode,
            } : undefined,
          });
          customerId = customer.id;
        }
      } catch (error) {
        console.error('Error managing customer:', error);
        // Proceed with payment even if customer creation fails
      }
    }

    // Create a payment intent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: currency.toLowerCase(),
      // Add metadata for tracking the donation type and donor info
      metadata: {
        donationType,
        firstName: donorInfo?.firstName || '',
        lastName: donorInfo?.lastName || '',
        email: donorInfo?.email || '',
        country: donorInfo?.country || '',
      },
      // Use the customer ID if available
      customer: customerId,
      // Specify automatic payment methods
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Error creating payment intent' },
      { status: 500 }
    );
  }
} 