# 🚰 Water Intake Tracker — Frontend

This is the **frontend** of the Water Intake Tracker challenge, built with **Next.js** and **TypeScript**. It allows users to log their daily water intake and visualize their hydration progress over the last 7 days.

---

## 🛆 Tech Stack

* **Next.js** (App Router)
* **TypeScript**
* **Tailwind CSS**
* **React Hook Form**
* **Jest & React Testing Library** (Unit testing)

---

## ✨ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/ali-ehmed/water-intake-tracker-challenge.git
git checkout feature/water-intake-tracker
cd /frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the dev server

```bash
npm run dev
```

> Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Running Tests

This project uses **Jest** and **React Testing Library** for testing components and form logic.

```bash
npm run test
```

---

## 📁 Project Structure

```
frontend/
│
├── src/
│   ├── app/              → Next.js App Router pages
│   ├── components/       → Reusable UI components
│   ├── lib/              → Helper functions
│   ├── styles/           → Tailwind/global styles
│   └── tests/            → Unit test files
│
├── public/               → Static assets
├── jest.config.ts        → Jest config
└── tsconfig.json         → TypeScript config
```

---

## 🌐 Environment Variables

Create a `.env.local` file and add your backend API URL:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Make sure the backend server is running on the correct port.

---

## ✅ Features

* Log water intake (ml) daily
* View 7-day intake summary
* Form validation
* Responsive UI
* Unit tests for critical components

---