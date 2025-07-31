# Water Intake Tracker - Backend

This is the backend service for the Water Intake Tracker application, built with **NestJS**, **Prisma**, and **SQLite**.

## 📦 Tech Stack

* **NestJS** - Backend framework
* **Prisma ORM** - Database modeling and querying
* **SQLite** - Lightweight relational database
* **Jest** - Unit testing

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ali-ehmed/water-intake-tracker-challenge.git
git checkout feature/water-intake-tracker
cd /backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

Create a `.env` file with the following content:

```env
DATABASE_URL="file:./dev.db"
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run Migrations (create tables)

```bash
npx prisma migrate dev --name init
```

### 6. Start the Server

```bash
npm run start:dev
```

Server will run at `http://localhost:3001`

## 🧪 Running Tests

```bash
npm run test
```

## 🛠️ API Endpoints

### POST `/water-log`

Logs water intake for a user.

```json
{
  "userId": "123",
  "date": "2025-07-30",
  "intakeMl": 500
}
```

### GET `/water-summary/:userId`

Returns last 7 days of intake summary for a user.

```json
[
  {
    "date": "2025-07-30",
    "totalIntake": 1500,
    "percentageOfGoal": 75
  },
  ...
]
```

## 📘 Swagger API Docs

Visit `http://localhost:3001/api` after starting the server.

## 📂 Project Structure

```
backend/
├── src/
│   ├── water/
│   │   ├── water.controller.ts
│   │   ├── water.service.ts
│   │   ├── dto/
│   │   └── interfaces/
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── test/
├── package.json
└── tsconfig.json
```