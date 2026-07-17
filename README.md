# Liputon.fi Telegram Bot

Monitor liputon.fi events and get notified via Telegram whenever new tickets are added for resale.

## Prerequisites

- Cloudflare account
- Telegram bot token (created e.g. via [BotFather](https://telegram.me/BotFather))
- pnpm@11 (`npm install -g pnpm@11`)

## Deploying

1. `cp .env.template .env` and fill in all required values
3. `pnpm install`
4. `pnpm wrangler:login`
5. `pnpm wrangler:create-kv-namespace`
6. `pnpm wrangler:deploy`
