# Copilot instructions for Nexo Tech

## Repository overview
This repository contains a Vite + React + TypeScript storefront for a demo electronics catalog. The project is designed for static deployment to Vercel and uses WhatsApp-based contact flows.

## Project conventions
- Prefer editing the existing project structure and component patterns before creating new abstractions.
- Keep the storefront focused on the academic demo: product catalog, product cards, and WhatsApp CTA behavior.
- Reuse the shadcn-inspired UI patterns under `components/ui`.
- Use TypeScript and keep the code consistent with the surrounding project style.

## Commands
- Start local app: `npm run dev:vercel`
- Build for Vercel: `npm run build:vercel`
- Run product tests: `npm run test:shop`

## Important behavior
- Preserve the target number in `lib/config.js` and do not replace the WhatsApp contact logic with unrelated integrations.
- Respect the demo mode and analytics logic in `lib/analytics.js`.
- Avoid collecting personal data or adding real payment/checkout logic.
- Keep changes small and relevant to the storefront experience.

## Quality bar
- Make accessible, mobile-friendly UI changes.
- Prefer targeted fixes and minimal diff scope.
- Verify the affected behavior after edits using the repo’s relevant tests or manual browser checks.
