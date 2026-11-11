
# 🛍️ LUXLANE – E-Commerce & Stock Management Platform

A full-stack e-commerce and stock management web application developed as a Final Year Project (PFE).

LUXLANE provides an online shopping experience and an administration system for managing products, categories, users, and orders.

## 🚀 Technologies Used

### Backend
- PHP 8.3
- Laravel 10
- RESTful API
- Laravel Sanctum
- Composer

### Frontend
- React 18
- Vite
- JavaScript
- Axios
- React Router
- Tailwind CSS
- Material Tailwind

### Database
- MySQL

### Development Tools
- Visual Studio Code
- Git & GitHub
- XAMPP
- npm

## ✨ Main Features

### 👤 User Interface
- User registration and authentication
- Browse products and categories
- View product details
- Shopping cart management
- Place orders
- Manage personal profile
- Comment on products

### 📝 Editor Dashboard
- Manage products
- Manage categories
- Manage videos
- Manage customer orders

### 🛠️ Admin Dashboard
- Dashboard statistics
- Manage products and categories
- Manage users and editors
- Manage customer orders
- Access reports

## 🏗️ Project Architecture

LUXLANE follows a separated frontend and backend architecture:

- **Frontend:** React.js single-page application
- **Backend:** Laravel REST API
- **Database:** MySQL
- **Authentication:** Laravel Sanctum token-based authentication

The frontend communicates with the backend through RESTful API endpoints.

## 📋 Prerequisites

Make sure you have installed:

- PHP >= 8.1
- Composer
- Node.js >= 18
- npm
- MySQL >= 5.7
- XAMPP (optional, for local development)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Ahmed17-ux/LUXLANE.git
cd LUXLANE
```

### 2. Backend Setup – Laravel

Install PHP dependencies:

```bash
composer install
```

Create the environment file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

### 3. Database Configuration

Create a MySQL database named:

```text
ecommerce
```

Configure your `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecommerce
DB_USERNAME=root
DB_PASSWORD=
```

Update the database credentials according to your local environment.

### 4. Run Migrations

```bash
php artisan migrate
```

If your project contains configured seeders, you can also run:

```bash
php artisan db:seed
```

### 5. Storage Configuration

Create the symbolic link for uploaded files:

```bash
php artisan storage:link
```

### 6. Start the Laravel Backend

```bash
php artisan serve
```

The backend API will be available at:

```text
http://127.0.0.1:8000
```

### 7. Frontend Setup – React

Open a second terminal:

```bash
cd StockFront_End
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run at the local URL displayed by Vite in your terminal.

## 🔗 API Configuration

The frontend communicates with the Laravel backend through the API configuration file:

```text
StockFront_End/src/api/IndexApi.jsx
```

Make sure the API base URL matches your backend server:

```javascript
http://127.0.0.1:8000/api
```

## 📁 Project Structure

```text
LUXLANE/
│
├── app/
│   ├── Models/
│   └── Http/
│       └── Controllers/
│
├── bootstrap/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
│
├── public/
├── resources/
├── routes/
│   ├── api.php
│   └── web.php
│
├── storage/
├── tests/
│
├── StockFront_End/
│   ├── src/
│   │   ├── api/
│   │   ├── Admin_things/
│   │   ├── Editor_things/
│   │   ├── User_things/
│   │   ├── components/
│   │   ├── pages/
│   │   └── routes/
│   │
│   └── package.json
│
├── .env.example
├── .gitignore
└── composer.json
```

## 🗄️ Main Database Entities

- Users
- Admins
- Editors
- Products
- Categories
- Orders
- Suppliers
- Transactions
- Comments
- Reports
- Messages
- Videos

## 🔐 Authentication & Authorization

The application uses Laravel Sanctum for API authentication.

Role-based access control separates permissions for:

- Users
- Editors
- Administrators

Authenticated requests use Bearer tokens to access protected API endpoints.

## 🧰 Useful Commands

| Task | Command |
|---|---|
| Install backend dependencies | `composer install` |
| Install frontend dependencies | `npm install` |
| Run migrations | `php artisan migrate` |
| Clear Laravel caches | `php artisan optimize:clear` |
| Start Laravel server | `php artisan serve` |
| Start React server | `npm run dev` |
| Build frontend | `npm run build` |

## 🎯 Project Objectives

The main objective of LUXLANE is to develop a complete e-commerce platform that simplifies online shopping and provides efficient management tools for products, customers, and orders.

The project demonstrates practical skills in full-stack web development, REST API integration, database management, authentication, and responsive user interface development.

## 👨‍💻 Developer

**Ahmed Legti**

Technician Specialized in Computer Science – Software Development (TSDI)

**Institution:** Institut Prosec – Beni Mellal, Morocco

**Academic Year:** 2025–2026

## 📌 Project Information

- **Project Name:** LUXLANE
- **Project Type:** Final Year Project (PFE)
- **Category:** E-Commerce Web Application
- **Repository:** [GitHub – LUXLANE](https://github.com/Ahmed17-ux/LUXLANE)

---
