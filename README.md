# 🚀 EtharaFlow AI

### AI-Powered Workflow & Task Evaluation Platform

EtharaFlow AI is a full-stack workflow and task management platform built using React, Node.js, Express, and MongoDB. The platform enables admins to manage projects, assign tasks, monitor workflows, and evaluate task quality using an AI-inspired evaluation system.

---

# ✨ Features

* JWT Authentication & Authorization
* Role-Based Access Control (Admin / Member)
* Project Management
* Full Task CRUD Operations
* Task Assignment & Status Tracking
* Overdue Task Detection
* AI-Inspired Task Evaluation & Scoring
* Dashboard Analytics
* Responsive SaaS-Style UI

---

# 👥 User Roles

## Admin

* Create, Edit, and Delete Projects
* Create, Edit, and Delete Tasks
* Assign Tasks to Members
* Track Analytics & Overdue Tasks
* Access AI Evaluation System

## Member

* View Assigned Tasks
* Update Task Status
* Track Deadlines
* View Evaluation Scores

---

# 🤖 AI Evaluation System

The platform includes an AI-inspired evaluator that analyzes task descriptions based on:

* Clarity
* Technical Specificity
* Engineering Keywords
* Actionable Structure

Example:

```text
Fix login
```

Output:

```text
Clarity Score: 2/10
Task lacks technical specificity.
```

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* Axios
* CSS

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas

## Authentication

* JWT
* bcrypt

## Deployment

* Vercel (Frontend)
* Railway (Backend)

---

# 📁 Project Structure

```text
client/
server/
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone <your-github-repo-link>
```

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

## Backend Setup

```bash
cd server
npm install
npm run server
```

---

# 🔑 Environment Variables

## Server `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

## Client `.env`

```env
VITE_API_URL=http://localhost:5000
```

---

# 🌐 Deployment

* Frontend: Vercel
* Backend: Railway
* Database: MongoDB Atlas

