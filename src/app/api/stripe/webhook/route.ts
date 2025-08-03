import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { getRawBody } from '@/lib/stripe-webhook';

// Initialize Stripe with the secret key
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-07-30.basil',
});

// Stripe webhook secret for verifying the event
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';

// This is needed for documentation purposes, though App Router handles this differently
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('Missing Stripe webhook secret. Please set the STRIPE_WEBHOOK_SECRET environment variable.');
      return NextResponse.json(
        { error: 'Stripe webhook secret is not configured' },
        { status: 500 }
      );
    }

    // Get raw body for Stripe verification
    const body = await getRawBody(req);
    // Get headers safely
    const signatureHeader = req.headers.get('stripe-signature') || '';

    let event: Stripe.Event;

    try {
      // Verify the webhook signature
      event = stripe.webhooks.constructEvent(
        body,
        signatureHeader,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Webhook signature verification failed: ${errorMessage}`);
      return NextResponse.json(
        { error: `Webhook Error: ${errorMessage}` },
        { status: 400 }
      );
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('✅ Payment success for session:', session.id);
        // TODO: обновить базу данных, активировать доступ и т.д.
        await handleCheckoutSessionCompleted(session);
        break;
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      case 'invoice.paid':
        console.log('💰 Подписка оплачена');
        // TODO: обновить базу данных для подписки
        break;
      case 'invoice.payment_failed':
        console.log('❌ Ошибка оплаты подписки');
        // TODO: уведомить пользователя об ошибке оплаты подписки
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
 * Handle checkout.session.completed event
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  // Extract data from session
  const customerId = session.customer;
  const amount = session.amount_total ? session.amount_total / 100 : 0; // Convert from cents to dollars
  const metadata = session.metadata || {};
  
  // Here you would typically:
  // 1. Record the completed payment in your database
  // 2. Update the user's subscription status if applicable
  // 3. Send confirmation email to customer
  // 4. Update inventory or trigger other business logic
  
  console.log(`Payment completed: ${amount} USD`);
  console.log(`Customer ID: ${customerId}`);
  console.log('Metadata:', metadata);
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