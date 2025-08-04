# 🛍️ Ecwid Online Store – Custom Widget with Admin Settings

This project is a full-stack TypeScript-based application that integrates a custom **"Recently Updated Products"** widget into an Ecwid online store. It also provides an admin **settings page** where the store owner can configure the widget and export product data.

All parts are fully containerized with **Docker Compose** and can be launched with a single command.

---

## 📁 Project Structure

<p class="has-line-data" data-line-start="0" data-line-end="5">ecwid-online-store/<br>
├── api/ # Express backend (TypeScript)<br>
├── client/ # Vue 3 frontend with Vite (TypeScript)<br>
├── docker-compose.yml<br>
└── <a href="http://README.md">README.md</a></p>


---

## 🚀 Features

### Part 1: Custom Widget

- Displays **recently updated products** on the **cart page**
- Matches Ecwid’s native grid design
- Allows:
    - Viewing product details
    - Adding products to cart directly
    - Selecting how many recent products to show
- Products added from the widget are tracked via **Ecwid order extra fields**

### Part 2: Admin Settings Page

- Protected admin page with:
    - Widget **on/off toggle**
    - Default number of products to display
    - Product list with **checkbox selection**
    - **Export to CSV/XLSX** functionality

### Part 3: Dockerization

- Fully containerized with **Docker** and **Docker Compose**
- One command to build and launch everything
- Runs anywhere Docker is supported

---

## 🛠️ Technologies Used

- **Vue 3** (Composition API) + Vite
- **Express** + Node.js (v22)
- **TypeScript**
- **Yarn**
- **Docker + Compose**
- **Prettier + ESLint**
- **Ecwid REST API**

---

## 📦 Setup & Installation

### Prerequisites

- Docker
- Docker Compose

---

### 🔐 Environment Variables

Create the following `.env` files:

#### `/client/.env`

```env
VITE_BASE_API_URL=https://app.ecwid.com/api/v3/
VITE_STORE_ID=101560752
VITE_TOKEN=public_ie55a1cQU472c1GBmeBqAVpL1ks3LFpu
```

#### `/api/.env`

```env
API_ORIGIN=http://localhost:3000/
```

### 🐳 Running the App (via Docker)

``docker-compose up --build``

### Task Checklist
✅ Custom widget embedded in cart page</p>
<p class="has-line-data" data-line-start="3" data-line-end="4">✅ Admin page with on/off toggle</p>
<p class="has-line-data" data-line-start="5" data-line-end="6">✅ Default product count setting</p>
<p class="has-line-data" data-line-start="7" data-line-end="8">✅ Export selected products (CSV/XLSX)</p>
<p class="has-line-data" data-line-start="9" data-line-end="10">✅ Store owner notified via extra fields</p>
<p class="has-line-data" data-line-start="11" data-line-end="12">✅ Entire project containerized with Docker Compose</p>
<p class="has-line-data" data-line-start="13" data-line-end="14">✅ Written in TypeScript using modern tooling</p>