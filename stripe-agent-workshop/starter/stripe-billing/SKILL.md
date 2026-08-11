---
name: stripe-billing
description: Safely look up Stripe Sandbox customers and subscriptions, preview Payment Link creation, and create approved Payment Links with traceable object IDs.
---

# Stripe Billing

Use this skill only for the narrow Stripe Sandbox workflow described below.

## Hard boundaries

- Accept only Stripe test or restricted-test keys from `STRIPE_SECRET_KEY` (`sk_test_` or `rk_test_`).
- Never accept, request, store, or print card numbers or other payment credentials.
- Never refund, cancel a subscription, delete an object, or modify an existing subscription.
- Customer and subscription operations are read-only.
- A write requires both:
  - the task explicitly contains `APPROVED=true`; and
  - environment variable `ALLOW_STRIPE_WRITES=true`.
- Never print environment variables or the Stripe key.
- Return the helper script's JSON result without adding prose.

## Dependency

Install the pinned-compatible Stripe SDK if it is missing:

```bash
python -m pip install "stripe>=12,<14"
```

## Read-only lookup

When the task asks for customer or subscription state, run:

```bash
python scripts/stripe_billing.py lookup-customer \
  --customer-email "CUSTOMER_EMAIL"
```

This command never writes to Stripe.

## Preview a Payment Link

If the task asks to create a link but does not contain `APPROVED=true`, return a proposal only:

```bash
python scripts/stripe_billing.py create-payment-link \
  --customer-email "CUSTOMER_EMAIL" \
  --plan-name "PLAN_NAME" \
  --unit-amount UNIT_AMOUNT \
  --currency CURRENCY \
  --mode subscription \
  --request-id "REQUEST_ID" \
  --approved false
```

Do not infer approval from conversational tone. The literal field must be present.

## Execute an approved Payment Link

Only if the task explicitly contains `APPROVED=true`, run:

```bash
python scripts/stripe_billing.py create-payment-link \
  --customer-email "CUSTOMER_EMAIL" \
  --plan-name "PLAN_NAME" \
  --unit-amount UNIT_AMOUNT \
  --currency CURRENCY \
  --mode subscription \
  --request-id "REQUEST_ID" \
  --approved true
```

Use `--mode one_time` only when the task explicitly requests a one-time price. The script uses the request ID to construct Stripe idempotency keys and writes it to object metadata.

## Output contract

Return exactly one JSON object with:

- `status`: `found`, `not_found`, `needs_approval`, `dry_run`, `created`, or `error`.
- `action`: the Stripe operation.
- `customer_id`: customer ID or `null`.
- `payment_link`: test Payment Link URL or `null`.
- `object_ids`: created or found Stripe object IDs.
- `evidence`: request ID, mode, amount, currency, or subscription summary.
- `error`: sanitized error object or `null`.

If input is invalid or a hard boundary is violated, return the script error and stop.
