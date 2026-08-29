# Rosterly — Employee Management System

A responsive Employee Management System built with **React + TypeScript**, styled with **Tailwind CSS**, and backed by a **JSON Server** mock API. Supports full CRUD on employee records, search/filter/sort, and a dashboard summary view.

## Features

- **Dashboard** — total, active, and inactive employee counts, plus department count and a recently-joined list.
- **Employee directory** — sortable, searchable, filterable table (card layout on mobile).
- **Add employee** — validated form (name, email, phone, department, role, joining date, status).
- **View employee** — full record in a modal.
- **Edit employee** — same validated form, pre-filled, updates via `PUT`.
- **Delete employee** — confirmation modal before `DELETE`.
- **Search & filter** — by name/email, department, status; sort by joining date.
- **UI states** — loading, empty, and error states throughout.
- **Fully responsive** — sidebar collapses to a mobile drawer, table collapses to cards.

## Tech Stack

| Layer      | Choice                          |
|------------|----------------------------------|
| Framework  | React 18 + TypeScript            |
| Build tool | Vite                             |
| Styling    | Tailwind CSS                     |
| Routing    | React Router                     |
| HTTP       | Axios                            |
| Mock API   | JSON Server                      |

## Project Structure

```
src/
├── components/
│   ├── layout/        # Sidebar, Navbar, page Layout wrapper
│   ├── dashboard/      # SummaryCard
│   ├── employees/      # Table, Row, Form, View/Delete modals, FilterBar
│   └── ui/              # Reusable primitives: Button, Input, Select, Modal,
│                        #  Badge, LoadingState, EmptyState, ErrorState
├── pages/
│   ├── DashboardPage.tsx
│   └── EmployeesPage.tsx
├── services/
│   └── api.ts           # Axios client + JSON Server endpoints
├── hooks/
│   ├── useEmployees.ts  # CRUD state (fetch/add/edit/delete)
│   └── useDebounce.ts
├── types/
│   └── employee.ts      # Employee, EmployeeInput, filters, etc.
├── utils/
│   ├── validation.ts     # Form validation rules
│   └── format.ts         # Date formatting, initials, ID tags
├── App.tsx                # Routes
└── main.tsx                # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the API URL (optional)

Copy the example env file. The default already points to JSON Server's local port.

```bash
cp .env.example .env
```

### 3. Run the mock API and the app together

```bash
npm run dev:all
```

This starts:
- **JSON Server** on `http://localhost:4000` (serving `db.json`)
- **Vite dev server** on `http://localhost:5173`

Or run them separately in two terminals:

```bash
npm run server   # JSON Server on :4000
npm run dev      # Vite on :5173
```

### 4. Build for production

```bash
npm run build
npm run preview
```

## API Reference (JSON Server)

| Method | Endpoint            | Description               |
|--------|----------------------|----------------------------|
| GET    | `/employees`          | List all employees         |
| GET    | `/employees/:id`      | Get a single employee      |
| POST   | `/employees`          | Create a new employee      |
| PUT    | `/employees/:id`      | Update an existing employee|
| DELETE | `/employees/:id`      | Delete an employee         |

Data is persisted to `db.json` in the project root while JSON Server is running.

## Deployment

The frontend (Vite build) can be deployed to **Netlify** or **Vercel**. Because JSON Server is a local mock API, it needs to be hosted separately for a live deployment (see note below).

### Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Add an environment variable `VITE_API_URL` pointing at your hosted JSON Server instance.
5. Deploy.

### Deploy to Netlify

1. Push this repository to GitHub.
2. Import the repo at [app.netlify.com/start](https://app.netlify.com/start).
3. Build command: `npm run build`. Publish directory: `dist`.
4. Add an environment variable `VITE_API_URL` in **Site settings → Environment variables**.
5. Deploy.

### Hosting JSON Server

JSON Server is a mock backend meant for local development. For a live demo, deploy it to a small Node host (Render, Railway, Fly.io, or a VPS) with:

```bash
npx json-server --watch db.json --port 4000 --host 0.0.0.0
```

Then set `VITE_API_URL` in your frontend deployment to that host's public URL. Alternatively, swap `src/services/api.ts` for any real REST backend — the rest of the app only depends on the `employeeApi` contract.

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Employee Management System"
git branch -M main
git remote add origin https://github.com/<your-username>/employee-management-system.git
git push -u origin main
```

## Design Notes

The UI takes a "personnel file / directory" visual language: a filing-tab accent on active nav items and badges, a monospace type used for record identifiers and dates (as if stamped), and a warm paper background instead of a stark white dashboard. Palette: ink navy for text, deep teal as the primary action color, warm gold and rust as secondary status accents.
