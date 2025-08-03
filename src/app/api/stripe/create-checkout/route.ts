import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key (safely, only on server)
// Add a fallback for development/test environments
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Missing Stripe secret key. Please set the STRIPE_SECRET_KEY environment variable.');
      return NextResponse.json(
        { error: 'Stripe secret key is not configured' },
        { status: 500 }
      );
    }
    
    const body = await request.json();
    const { amount, donationType } = body;
    
    // Check that the amount and donation type are provided
    if (!amount || !donationType) {
      return NextResponse.json(
        { error: 'Amount and donation type are required' },
        { status: 400 }
      );
    }
    
    // Determine parameters based on donation type
    const isSubscription = donationType === 'monthly';
    const mode = isSubscription ? 'subscription' : 'payment';
    
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    
    // Create Stripe Checkout Session parameters
    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: isSubscription ? 'Monthly Donation' : 'One-Time Donation',
              description: 'Donation to support humanitarian aid',
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
            ...(isSubscription ? { recurring: { interval: 'month' } } : {}),
          },
          quantity: 1,
        },
      ],
      mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
      success_url: `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      billing_address_collection: 'auto',
      customer_creation: 'always',
      payment_intent_data: !isSubscription ? {
        description: 'Donation to support humanitarian aid',
      } : undefined,
      metadata: {
        donationType: donationType
      }
    };

    console.log('Creating Stripe session with params:', JSON.stringify(params));

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create(params);
    console.log('Session created:', session.id);

    // Return the session ID
    return NextResponse.json({ sessionId: session.id });
    
  } catch (error: unknown) {
    console.error('Stripe checkout error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 