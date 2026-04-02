# 📊 Finance Dashboard UI

A modern **Finance Dashboard Web Application** built using React and Vite that allows users to track income, expenses, and financial insights through an interactive and responsive interface.

---

## 🚀 Live Demo

🔗 https://finance-dashboard-ui-b63l.vercel.app/

---

## 📂 GitHub Repository

🔗 https://github.com/rohan250903/Finance-Dashboard-UI

---

## 📌 Project Overview

This project is a **role-based finance dashboard** designed to help users monitor their financial activities efficiently. It provides a clean UI with data visualization, transaction tracking, and insightful analytics.

---

## ✨ Features

* Dashboard Overview with Summary Cards
* Total Balance, Income & Expense Tracking
* Monthly Trend Visualization (Charts)
* Category-wise Expense Breakdown
* Transaction List with Details
* Transaction Filtering & Sorting
* Role-Based UI (Admin & Viewer)
* Insights Section for Financial Analysis
* Dark Mode Support 🌙
* Responsive Design (Mobile + Desktop)
* Local Storage Persistence

---

## 🛠️ Tech Stack

### Frontend

* React.js (with TypeScript)
* Vite
* Tailwind CSS

### Libraries Used

* Lucide React (Icons)
* Context API (State Management)

---

## 📁 Project Structure

Finance-Dashboard-UI/
│── src/
│   ├── components/
│   ├── context/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
│── public/
│── index.html
│── package.json
│── vite.config.ts

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

git clone https://github.com/rohan250903/Finance-Dashboard-UI.git
cd Finance-Dashboard-UI

### 2️⃣ Install dependencies

npm install

### 3️⃣ Run the development server

npm run dev

### 4️⃣ Build for production

npm run build

---

## 🧠 Technical Decisions & Trade-offs

* React + Vite chosen for fast development and optimized performance
* Context API used instead of Redux for simplicity (small-medium scale app)
* Tailwind CSS used for rapid UI development and responsiveness
* LocalStorage used instead of backend for simplicity and faster implementation

### Trade-offs:

* No backend → data is not persistent across devices
* Limited scalability without API/database
* Role-based system is frontend-only (no authentication)

---

## 📊 How It Works

1. User interacts with transactions
2. Data is stored in localStorage
3. Dashboard calculates total income, expenses, and balance
4. Charts visualize trends and categories
5. Insights provide basic financial analysis

---

## 🔮 Future Improvements

* Backend integration (Node.js / Firebase)
* Authentication system (JWT / OAuth)
* Real-time data sync
* Export reports (PDF/CSV)
* AI-based financial insights
* Advanced filtering & search

---
## ⚠️ Known Limitations

* No backend/database
* No user authentication
* Data stored locally only
* Basic analytics

---

## 👨‍💻 Author

Rohan Ghosh
GitHub: https://github.com/rohan250903

---

## 📜 License

This project is licensed under the MIT License.

---

## ⭐ Final Note

This project demonstrates strong frontend fundamentals, UI/UX design, state management, and real-world dashboard implementation.
