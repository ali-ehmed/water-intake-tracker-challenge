How to run:

FrontEnd:
cd frontend && npm run dev

BAKCEND:
cd backend && npm run start:dev

# Fullstack Technical Challenge – Water Intake Tracker 💧

Welcome! This is your take-home assignment to help us assess your fullstack development skills in a real-world feature scenario.

---

## Goal

You're tasked with building a small feature for a health tracking platform: a **Water Intake Tracker**.

Users should be able to:

- Submit their **daily water intake (in ml)**
- View a **weekly summary chart** that compares intake against a fixed hydration goal (2,000 ml/day)

---

## Tech Stack

You're expected to use the following technologies:

### Backend
- **NestJS** (TypeScript)
- **Prisma** (with SQLite – already set up)
- **Jest** (for unit testing)

### Frontend
- **Next.js** (TypeScript + React)
- **Any UI framework** (e.g., shadcn/ui, Tailwind, AntD, or plain CSS)
- **Charting**: You may use `recharts`, `chart.js`, or anything lightweight

---

## Your Tasks

### 1. **Backend API**

Implement two API endpoints in the provided NestJS backend:

#### `POST /water-log`
- Accepts: `userId: string`, `date: string`, `intakeMl: number`
- Behavior: Upsert water intake for that user + date (one log per day)

#### `GET /water-summary/:userId`
- Returns the **last 7 days** of logs for the user
- Each item should include:
  - `date` (YYYY-MM-DD)
  - `totalIntake` (ml)
  - `percentageOfGoal` (0–100, based on 2000ml/day goal)

- 💡 Use **raw SQL** (`prisma.$queryRaw`) for this query.

---

### 2. **Frontend UI**

Implement two pages in the Next.js frontend:

#### `/log`
- A form to log water intake for a selected day
- Input fields: `date`, `intakeMl`
- Submits to `POST /water-log`
- Show success/failure state

#### `/summary`
- Fetch from `GET /water-summary/:userId`
- Render a **bar chart** of the last 7 days
- Each bar = intake for a day
- Include a horizontal reference line at 2,000ml to visualize the goal

---

### 3. **Unit Tests**

Write **at least one** test on each side:

- Backend (Jest): e.g., test the service method for logging or summary
- Frontend (Jest): e.g., test a small component or form logic

---

## 📦 Setup Instructions

### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

* The database uses **SQLite**, stored at `prisma/dev.db`
* Port: `http://localhost:3001`

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

* Access the app at `http://localhost:3000`

---

## 🚀 Running the Application

1. **Start the Backend:**
   ```bash
   cd backend
   npm run start:dev
   ```

2. **Start the Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📊 Features Implemented

✅ **Backend API:**
- `POST /water/log` - Log water intake (upsert functionality)
- `GET /water/summary/:userId` - Get weekly summary with percentage calculations
- SQLite database with Prisma ORM
- Unit tests for service methods

✅ **Frontend UI:**
- Modern, responsive design with Tailwind CSS
- `/log` page with form to submit water intake
- `/summary` page with interactive bar chart using Recharts
- Real-time data fetching and error handling
- "Well done!" message for users meeting goals (5+ days)
- Unit tests for components

✅ **Bonus Features:**
- Beautiful, modern UI with gradient backgrounds
- Progress indicators and success messages
- Responsive design for mobile and desktop
- Interactive charts with tooltips
- Daily breakdown with percentage bars

## 🎯 API Endpoints

### POST /water/log
```json
{
  "userId": "user123",
  "date": "2025-07-31",
  "intakeMl": 1800
}
```

### GET /water/summary/user123
```json
{
  "userId": "user123",
  "summary": [
    {
      "date": "2025-07-25",
      "totalIntake": 0,
      "percentageOfGoal": 0
    },
    {
      "date": "2025-07-26",
      "totalIntake": 0,
      "percentageOfGoal": 0
    }
    // ... 7 days total
  ]
}
```

---

## 📬 Submission Instructions

1. Fork this repo
2. Complete the tasks with clean, readable commits
3. Push your code and open a **pull request**
4. In your PR, include:

   * Any notes or assumptions
   * How you tested your work
   * Anything you'd improve with more time

---

### AI Tool Usage Policy

We welcome the use of AI-assisted tools such as **ChatGPT**, **Cursor**, **GitHub Copilot**, or others — just like you'd use Stack Overflow or documentation. These are valuable aids in modern development.

However, we expect you to use them **responsibly**:

* Feel free to use AI tools to assist with **boilerplate**, **debugging**, or **structuring** code.
* Please **do not copy-paste entire solutions** without understanding or customizing them.
* You should be able to **clearly explain your code** during a review or interview.
* If you used AI for a specific part, mention it briefly in your PR. For example:

  > *"I used ChatGPT to help write the SQL aggregation logic, then refined it and tested edge cases manually."*

We're not testing how much you can memorize — we're interested in **how you think**, **how you learn**, and **how you deliver** working solutions using modern tools.

---

### AI Tool Usage Policy

We welcome the use of AI-assisted tools such as **ChatGPT**, **Cursor**, **GitHub Copilot**, or others — just like you'd use Stack Overflow or documentation. These are valuable aids in modern development.

However, we expect you to use them **responsibly**:

* Feel free to use AI tools to assist with **boilerplate**, **debugging**, or **structuring** code.
* Please **do not copy-paste entire solutions** without understanding or customizing them.
* You should be able to **clearly explain your code** during a review or interview.
* If you used AI for a specific part, mention it briefly in your PR. For example:

  > *"I used ChatGPT to help write the SQL aggregation logic, then refined it and tested edge cases manually."*

We’re not testing how much you can memorize — we’re interested in **how you think**, **how you learn**, and **how you deliver** working solutions using modern tools.

---


## ⏱ Estimated Time

2–3 hours. Please don't overthink. We're not expecting perfection — just your best version of clean, working, testable code.

---

## Bonus (optional)

* ✅ Show a "Well done!" message if 5+ of 7 days meet or exceed the goal
* Use GitHub Actions to run backend unit tests
* Add styling polish or animations for chart transitions

---

Looking forward to your solution. Good luck!
