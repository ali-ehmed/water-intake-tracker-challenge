# Water Intake Tracker – Frontend

This is the frontend for the Water Intake Tracker challenge, built with Next.js (TypeScript), Tailwind CSS, and Recharts.

## Features
- **/log**: Log your daily water intake (date + ml), with success/failure feedback.
- **/summary**: View a weekly bar chart of your water intake, with a 2000ml goal line and a “Well done!” message for 5+ days at goal.
- Modern, responsive UI with consistent navigation and card layouts.

## Tech Stack
- Next.js (TypeScript + React)
- Tailwind CSS
- Recharts (for charts)
- Jest & React Testing Library (for unit tests)

## Setup

```bash
cd frontend
npm install
npm run dev
```
- App runs at `http://localhost:3000`

## Testing

Run all tests:
```bash
npm run test
```

## Pages

- `/log`: Log water intake for a selected day.
- `/summary`: View a weekly summary chart.

## Notes
- Connects to backend API at `http://localhost:3001`.
- See main project README for full-stack instructions.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
