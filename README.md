# Ummah Emergency Appeal

This is a donation platform for humanitarian aid causes.

## Environment Setup

Before running the project, you need to set up the environment variables:

1. Create a `.env.local` file in the root directory
2. Add the following variables:

```
# Stripe API keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_your_publishable_key_here
STRIPE_SECRET_KEY=sk_your_secret_key_here
```

3. Replace the placeholder values with your actual Stripe API keys

## Features

- One-time and monthly donation options
- Stripe integration for secure payments
- Responsive design for all devices
- Testimonials section
- Impact visualization

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

When deploying to a hosting provider (Vercel, Netlify, etc.), make sure to add the environment variables in your project settings.

**Important**: Never commit your Stripe Secret Key to version control.
