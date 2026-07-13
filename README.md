# DeSite Products Landing

One-page media kit and product landing page for DeSite Products compact
portable vibratory screeners, rebuilt as a standard Next.js app with the
original layout and a black-and-red color palette.

## Stack

- Next.js
- React
- Tailwind CSS
- AWS Amplify Hosting-ready build configuration

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000/`.

## Validation

```bash
npm run lint
npm run build
```

The production build writes the Next.js output to `.next/`.

## AWS Amplify

This repository includes `amplify.yml` for Amplify Hosting. The build uses
Node 22, installs with `npm ci`, runs `npm run build`, and publishes the `.next`
artifact directory.

## Project Notes

- Main entry point: `app/page.tsx`
- DeSite components: `app/components/desite/`
- Shared content data: `app/lib/desiteData.ts`
- Placeholder media paths are visible in the UI and are ready to replace with
  real product, jobsite, customer, video, and social proof assets.
