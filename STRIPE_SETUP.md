# Настройка Stripe для проекта

## Необходимые переменные окружения

Для правильной работы Stripe в вашем проекте необходимо настроить следующие переменные окружения:

```bash
# Ключи API Stripe
STRIPE_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## Получение ключей Stripe

1. Создайте аккаунт на [Stripe Dashboard](https://dashboard.stripe.com/).
2. В разделе "Developers" → "API keys" найдите ваши API ключи.
3. Для тестирования используйте тестовые ключи (начинаются с `sk_test_` и `pk_test_`).

## Настройка веб-хука Stripe

1. Перейдите в [Dashboard Stripe](https://dashboard.stripe.com/webhooks)
2. Нажмите кнопку "Add endpoint"
3. Введите URL вашего вебхука:
   - Для продакшена: `https://ваш-домен.vercel.app/api/stripe/webhook`
   - Для тестирования: используйте Stripe CLI или сервис туннелирования
4. Выберите события для отслеживания:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `invoice.paid`
   - `invoice.payment_failed`
5. Нажмите "Add endpoint"
6. После создания вебхука, скопируйте "Signing secret" - это и есть ваш `STRIPE_WEBHOOK_SECRET`

## Настройка переменных окружения в Vercel

1. Перейдите в настройки вашего проекта в [Vercel Dashboard](https://vercel.com/dashboard)
2. Выберите ваш проект
3. Перейдите в раздел "Settings" → "Environment Variables"
4. Добавьте все необходимые переменные окружения
5. Сохраните и выполните повторное развертывание

## Локальное тестирование веб-хуков

1. Установите [Stripe CLI](https://stripe.com/docs/stripe-cli):
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

2. Войдите в Stripe:
   ```bash
   stripe login
   ```

3. Запустите локальный сервер:
   ```bash
   npm run dev
   ```

4. В отдельном терминале запустите прокси для пересылки веб-хуков:
   ```bash
   stripe listen --forward-to http://localhost:3000/api/stripe/webhook
   ```
   
   Stripe CLI предоставит вам тестовый `STRIPE_WEBHOOK_SECRET` для локальной разработки.

5. Тестирование события:
   ```bash
   stripe trigger checkout.session.completed
   ```

## Тестовые карты для Stripe

Для тестирования платежей используйте следующие данные карт:

- **Успешная оплата**: 4242 4242 4242 4242
- **Требуется 3D Secure**: 4000 0000 0000 3220
- **Отклонённая карта**: 4000 0000 0000 0002

Для любой тестовой карты используйте:
- Любую будущую дату для срока действия (MM/YY)
- Любые 3 цифры для CVC
- Любой почтовый индекс

## Обработка событий

Веб-хук настроен для обработки следующих типов событий:

1. `checkout.session.completed` - успешное завершение оплаты через Checkout
2. `payment_intent.succeeded` - успешное выполнение платежа
3. `payment_intent.payment_failed` - ошибка платежа
4. `invoice.paid` - оплата счета (подписки)
5. `invoice.payment_failed` - ошибка оплаты счета

При необходимости можно добавить обработку дополнительных событий в файл `src/app/api/stripe/webhook/route.ts`. 