import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-07-30.basil',
});

// Stripe webhook secret for verifying the event
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(req: Request) {
  const body = await req.text();
  // Get headers safely
  const signatureHeader = req.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(body, signatureHeader, webhookSecret);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  // Handle different event types
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;
        
      // You can add more event handlers here
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    // Return a success response
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error(`Error processing webhook event: ${err}`);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Handle successful payment
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  // Extract metadata from the payment intent
  const donationType = paymentIntent.metadata.donationType || 'once';
  const amount = paymentIntent.amount / 100; // Convert cents to dollars
  const currency = paymentIntent.currency.toUpperCase();
  
  // Here you would typically:
  // 1. Record the donation in your database
  // 2. Send a thank you email to the donor
  // 3. Update any relevant statistics
  
  console.log(`Donation received: ${amount} ${currency} (${donationType})`);
  
  // For now, we'll just log the success
  console.log(`Payment succeeded for PaymentIntent: ${paymentIntent.id}`);
}

/**
 * Handle failed payment
 */
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  // Here you would typically:
  // 1. Log the failure
  // 2. Notify administrators
  // 3. Potentially reach out to the donor
  
  console.log(`Payment failed for PaymentIntent: ${paymentIntent.id}`);
  
  // Get the last payment error
  const error = paymentIntent.last_payment_error;
  if (error) {
    console.log(`Payment error: ${error.message}`);
  }
} 