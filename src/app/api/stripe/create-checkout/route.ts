import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Инициализация Stripe с секретным ключом (безопасно, только на сервере)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe secret key is not configured' },
        { status: 500 }
      );
    }
    
    const body = await request.json();
    const { amount, donationType } = body;
    
    // Проверка, что сумма и тип пожертвования предоставлены
    if (!amount || !donationType) {
      return NextResponse.json(
        { error: 'Amount and donation type are required' },
        { status: 400 }
      );
    }
    
    // Определение параметров в зависимости от типа пожертвования
    const isSubscription = donationType === 'monthly';
    const mode = isSubscription ? 'subscription' : 'payment';
    
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    
    // Создание параметров для Stripe Checkout Session
    const params: any = {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: isSubscription ? 'Monthly Donation' : 'One-Time Donation',
              description: 'Donation to support humanitarian aid',
            },
            unit_amount: Math.round(amount * 100), // Конвертация в центы
            ...(isSubscription ? { recurring: { interval: 'month' } } : {}),
          },
          quantity: 1,
        },
      ],
      mode: mode,
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

    // Создание Stripe Checkout Session
    const session = await stripe.checkout.sessions.create(params);
    console.log('Session created:', session.id);

    // Возврат ID сессии
    return NextResponse.json({ sessionId: session.id });
    
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 