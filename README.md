# E-commerce / Stock Management Platform

A full-stack e-commerce & stock management application.

- **Backend:** Laravel 10 REST API (PHP 8.1+, MySQL, Sanctum token auth)
- **Frontend:** React 18 + Vite (single-page app in `StockFront_End/`)

The app has three role-based areas, each with its own login and abilities:

| Role   | What they can do                                                        | Default login                          |
|--------|-------------------------------------------------------------------------|----------------------------------------|
| User   | Browse the shop, place orders, comment on products, manage own profile  | `houssamhd@gmail.com` / `houssamhd@gmail.com` |
| Editor | Manage products, categories, videos                                     | `editorhd@gmail.com` / `editorhd@@`    |
| Admin  | Everything an editor can do + manage editors, users, reports, orders    | `adminhd@gmail.com` / `adminhd@@`      |

> These accounts are created by the database seeder (see below).

---

## 1. Prerequisites

Make sure the following are installed:

- **PHP** >= 8.1 (with extensions: `pdo_mysql`, `mbstring`, `openssl`, `fileinfo`, `ctype`, `json`, `bcmath`, `tokenizer`, `xml`)
- **Composer** (latest)
- **Node.js** >= 18 and **npm**
- **MySQL** >= 5.7 / MariaDB (or any DB supported by Laravel)

---

## 2. Backend setup (Laravel API)

Run these from the **project root** (`E-commerce/`).

### 2.1 Install PHP dependencies
```bash
composer install
```

### 2.2 Create the environment file
```bash
# copy the template
cp .env.example .env      # Windows PowerShell: Copy-Item .env.example .env
```

### 2.3 Generate the application key
```bash
php artisan key:generate
```

### 2.4 Configure the database
Create a MySQL database (default name is `laravel`), then edit `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

### 2.5 Run migrations + seed the database
This creates all tables **and** the default Admin / Editor / User accounts plus 50 sample users.
```bash
php artisan migrate --seed
```
> Already migrated? Re-seed only with `php artisan db:seed`.
> Start completely fresh with `php artisan migrate:fresh --seed`.

### 2.6 Link the storage folder (required for images)
Uploaded product / profile images are served from `/storage`, so this symlink is mandatory:
```bash
php artisan storage:link
```

### 2.7 Start the API server
```bash
php artisan serve
```
The API now runs at **http://localhost:8000** (the frontend expects exactly this URL — see note below).

---

## 3. Frontend setup (React + Vite)

Open a **second terminal** and run from the `StockFront_End/` folder:

```bash
cd StockFront_End
npm install
npm run dev
```
The frontend runs at **http://localhost:3000**.

> **Important – API URL:** the frontend talks to the backend at a hard-coded URL
> `http://localhost:8000/api`, defined in [`StockFront_End/src/api/IndexApi.jsx`](StockFront_End/src/api/IndexApi.jsx).
> Image URLs (`http://localhost:8000/storage/...`) are also hard-coded across the
> components. If you run the backend on a different host/port, update these references.

### Build for production
```bash
npm run build      # outputs to StockFront_End/dist
npm run preview    # preview the production build
```

---

## 4. Quick start (TL;DR)

```bash
# --- Backend (terminal 1) ---
composer install
cp .env.example .env
php artisan key:generate
# create the MySQL database, then edit DB_* in .env
php artisan migrate --seed
php artisan storage:link
php artisan serve            # -> http://localhost:8000

# --- Frontend (terminal 2) ---
cd StockFront_End
npm install
npm run dev                  # -> http://localhost:3000
```

Then open **http://localhost:3000** and log in with one of the default accounts above.

---

## 5. Seeded data & default accounts

The seeder [`database/seeders/DatabaseSeeder.php`](database/seeders/DatabaseSeeder.php) creates:

| Type   | Name           | Email                  | Password                |
|--------|----------------|------------------------|-------------------------|
| User   | user_houssam   | `houssamhd@gmail.com`  | `houssamhd@gmail.com`   |
| Admin  | admin ladmin   | `adminhd@gmail.com`    | `adminhd@@`             |
| Editor | editor leditor | `editorhd@gmail.com`   | `editorhd@@`            |

Plus **50 randomly generated users** (via factory) for testing lists/pagination.

> Products, categories, orders, etc. are **not** seeded — create them through the
> Admin/Editor UI after logging in.

---

## 6. Project structure

```
E-commerce/
├── app/                  # Laravel application code (Models, Http/Controllers, ...)
├── bootstrap/
├── config/
├── database/
│   ├── factories/        # User, Admin, Editor factories
│   ├── migrations/       # All table schemas
│   └── seeders/          # DatabaseSeeder (default accounts + sample users)
├── public/               # Laravel public web root (index.php)
├── routes/
│   ├── api.php           # REST API (user / editor / admin prefixes, Sanctum abilities)
│   ├── web.php
│   └── auth.php
├── storage/              # Logs, cache, uploaded files (linked to public/storage)
├── tests/
├── .env.example          # Environment template
├── composer.json
└── StockFront_End/       # React + Vite frontend (separate npm project)
    ├── src/
    │   ├── api/          # IndexApi.jsx -> axios baseURL = http://localhost:8000/api
    │   ├── Admin_things/ # Admin dashboard UI
    │   ├── Editor_things/ # Editor dashboard UI
    │   ├── User_things/  # Shop, cart, checkout, profile
    │   ├── pages/ components/ layout/ routes/ service/ Contextapi/
    └── package.json
```

### Main data entities
`User`, `Admin`, `Editor`, `Role`, `Product`, `Category`, `Order`, `Transaction`,
`Supplier`, `Comment`, `Report`, `Message`, `Video`.

### Tech stack
- Laravel 10, Laravel Sanctum (token auth with abilities), Laravel Breeze/UI, Inertia, Ziggy
- React 18, React Router, React Query, React Hook Form + Zod, Axios
- Tailwind CSS, Material Tailwind, Radix UI, Nivo charts, Lucide / Heroicons

---

## 7. Authentication notes

The API uses **Laravel Sanctum** with token *abilities* to separate the three areas:
- `/api/user/*`   → requires ability `user`
- `/api/editor/*` → requires ability `editor`
- `/api/admin/*`  → requires ability `admin`

Tokens are issued at login and sent by the frontend as a Bearer token on each request.

---

## 8. Common commands

| Task                          | Command                              |
|-------------------------------|--------------------------------------|
| Rebuild DB + reseed           | `php artisan migrate:fresh --seed`   |
| Re-run seeders only           | `php artisan db:seed`                |
| Clear caches                  | `php artisan optimize:clear`         |
| Run backend tests             | `php artisan test`                   |
| Re-create storage symlink     | `php artisan storage:link`           |
| Lint frontend                 | `cd StockFront_End && npm run lint`  |

---

## 9. Troubleshooting

- **Images don't load / 404 on `/storage/...`** → run `php artisan storage:link` and make sure the backend is on port 8000.
- **CORS / network errors in the browser** → confirm the API is running at `http://localhost:8000` and check `config/cors.php`.
- **`No application encryption key`** → run `php artisan key:generate`.
- **Frontend can't reach the API on a different port** → edit the base URL in `StockFront_End/src/api/IndexApi.jsx` (and the hard-coded `localhost:8000/storage` image URLs).
- **`vendor/` or `node_modules/` missing** → they are not included in the distribution; run `composer install` and `npm install` to restore them.
