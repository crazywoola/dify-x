#!/usr/bin/env python3
"""Narrow Stripe Sandbox helper for the Dify × Stripe workshop."""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from typing import Any


SUPPORTED_CURRENCIES = {"usd", "eur", "gbp"}
TEST_KEY_PREFIXES = ("sk_test_", "rk_test_")
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def emit(payload: dict[str, Any], exit_code: int = 0) -> None:
    print(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))
    raise SystemExit(exit_code)


def base_payload(action: str) -> dict[str, Any]:
    return {
        "status": "error",
        "action": action,
        "customer_id": None,
        "payment_link": None,
        "object_ids": [],
        "evidence": {},
        "error": None,
    }


def fail(action: str, code: str, message: str, exit_code: int = 2) -> None:
    payload = base_payload(action)
    payload["error"] = {"code": code, "message": message}
    emit(payload, exit_code)


def validate_email(value: str, action: str) -> str:
    email = value.strip().lower()
    if not EMAIL_RE.match(email):
        fail(action, "invalid_email", "customer_email is not a valid email address")
    return email


def get_test_key(action: str) -> str:
    key = os.getenv("STRIPE_SECRET_KEY", "").strip()
    if not key:
        fail(action, "missing_secret", "STRIPE_SECRET_KEY is required")
    if not key.startswith(TEST_KEY_PREFIXES):
        fail(action, "live_key_rejected", "Only sk_test_ or rk_test_ Stripe keys are allowed")
    return key


def import_stripe(action: str, key: str):
    try:
        import stripe  # type: ignore
    except ImportError:
        fail(action, "missing_dependency", 'Install the dependency with: python -m pip install "stripe>=12,<14"')
    stripe.api_key = key
    return stripe


def sanitize_error(exc: Exception, key: str | None = None) -> str:
    message = str(exc)
    if key:
        message = message.replace(key, "[REDACTED]")
    return message[:600]


def lookup_customer(args: argparse.Namespace) -> None:
    action = "customer.lookup"
    email = validate_email(args.customer_email, action)
    key = get_test_key(action)
    stripe = import_stripe(action, key)

    try:
        customers = stripe.Customer.list(email=email, limit=10).data
        if not customers:
            payload = base_payload(action)
            payload.update({
                "status": "not_found",
                "evidence": {"customer_email": email, "customer_count": 0},
                "error": None,
            })
            emit(payload)

        customer = customers[0]
        subscriptions = stripe.Subscription.list(
            customer=customer.id,
            status="all",
            limit=10,
        ).data
        summaries = [
            {
                "id": subscription.id,
                "status": subscription.status,
                "cancel_at_period_end": bool(subscription.cancel_at_period_end),
            }
            for subscription in subscriptions
        ]
        payload = base_payload(action)
        payload.update({
            "status": "found",
            "customer_id": customer.id,
            "object_ids": [customer.id, *[item["id"] for item in summaries]],
            "evidence": {
                "customer_email": email,
                "customer_count": len(customers),
                "subscriptions": summaries,
            },
            "error": None,
        })
        emit(payload)
    except Exception as exc:  # Stripe's exception hierarchy varies across SDK versions.
        fail(action, "stripe_request_failed", sanitize_error(exc, key), 1)


def proposal(args: argparse.Namespace, email: str) -> dict[str, Any]:
    return {
        "customer_email": email,
        "plan_name": args.plan_name.strip(),
        "unit_amount": args.unit_amount,
        "currency": args.currency.lower(),
        "mode": args.mode,
        "request_id": args.request_id.strip(),
        "objects": ["product", "price", "payment_link"],
    }


def create_payment_link(args: argparse.Namespace) -> None:
    action = "payment_link.create"
    email = validate_email(args.customer_email, action)
    currency = args.currency.lower()
    plan_name = args.plan_name.strip()
    request_id = args.request_id.strip()

    if not plan_name:
        fail(action, "invalid_plan_name", "plan_name must not be empty")
    if args.unit_amount <= 0:
        fail(action, "invalid_amount", "unit_amount must be a positive integer in minor units")
    if currency not in SUPPORTED_CURRENCIES:
        fail(action, "unsupported_currency", f"currency must be one of {sorted(SUPPORTED_CURRENCIES)}")
    if not request_id or len(request_id) > 120:
        fail(action, "invalid_request_id", "request_id must be 1-120 characters")

    proposed_action = proposal(args, email)
    if args.dry_run:
        payload = base_payload(action)
        payload.update({
            "status": "dry_run",
            "evidence": {"proposed_action": proposed_action},
            "error": None,
        })
        emit(payload)

    if args.approved != "true":
        payload = base_payload(action)
        payload.update({
            "status": "needs_approval",
            "evidence": {"proposed_action": proposed_action, "required_literal": "APPROVED=true"},
            "error": None,
        })
        emit(payload)

    if os.getenv("ALLOW_STRIPE_WRITES", "").strip().lower() != "true":
        fail(action, "writes_disabled", "Set ALLOW_STRIPE_WRITES=true in the Agent environment after operator review")

    key = get_test_key(action)
    stripe = import_stripe(action, key)
    metadata = {"dify_request_id": request_id, "customer_email": email}
    key_base = f"dify-workshop:{request_id}"

    try:
        product = stripe.Product.create(
            name=plan_name,
            metadata=metadata,
            idempotency_key=f"{key_base}:product",
        )
        price_params: dict[str, Any] = {
            "product": product.id,
            "unit_amount": args.unit_amount,
            "currency": currency,
            "metadata": metadata,
            "idempotency_key": f"{key_base}:price",
        }
        if args.mode == "subscription":
            price_params["recurring"] = {"interval": "month"}
        price = stripe.Price.create(**price_params)
        payment_link = stripe.PaymentLink.create(
            line_items=[{"price": price.id, "quantity": 1}],
            metadata=metadata,
            idempotency_key=f"{key_base}:payment-link",
        )
        payload = base_payload(action)
        payload.update({
            "status": "created",
            "payment_link": payment_link.url,
            "object_ids": [product.id, price.id, payment_link.id],
            "evidence": proposed_action,
            "error": None,
        })
        emit(payload)
    except Exception as exc:
        fail(action, "stripe_request_failed", sanitize_error(exc, key), 1)


def parser() -> argparse.ArgumentParser:
    root = argparse.ArgumentParser(description="Stripe Sandbox helper for the Dify × Stripe workshop")
    subparsers = root.add_subparsers(dest="command", required=True)

    lookup = subparsers.add_parser("lookup-customer", help="Read a customer and up to ten subscriptions")
    lookup.add_argument("--customer-email", required=True)
    lookup.set_defaults(handler=lookup_customer)

    create = subparsers.add_parser("create-payment-link", help="Preview or create a test Payment Link")
    create.add_argument("--customer-email", required=True)
    create.add_argument("--plan-name", required=True)
    create.add_argument("--unit-amount", required=True, type=int)
    create.add_argument("--currency", required=True)
    create.add_argument("--mode", choices=("one_time", "subscription"), default="subscription")
    create.add_argument("--request-id", required=True)
    create.add_argument("--approved", choices=("true", "false"), default="false")
    create.add_argument("--dry-run", action="store_true")
    create.set_defaults(handler=create_payment_link)
    return root


def main() -> None:
    args = parser().parse_args()
    args.handler(args)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        fail("unknown", "interrupted", "Operation interrupted", 130)
    except SystemExit:
        raise
    except Exception as exc:
        payload = base_payload("unknown")
        payload["error"] = {"code": "unexpected_error", "message": sanitize_error(exc)}
        print(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))
        sys.exit(1)
