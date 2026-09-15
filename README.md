# EduLearn - Educational Video Platform & Marketplace

<p align="center">
  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80" alt="EduLearn Banner" width="100%" style="border-radius: 16px; max-height: 380px; object-fit: cover;" />
</p>

<p align="center">
  <strong>Modern 3-Sided Educational Video Platform & Course Marketplace</strong><br />
  Built with <strong>Laravel 13</strong>, <strong>Inertia.js v2</strong>, <strong>React 19</strong>, <strong>Tailwind CSS</strong>, and <strong>PostgreSQL 16</strong>.<br />
  Fully containerized with production-grade <strong>Docker</strong>, <strong>Nginx</strong>, and <strong>Supervisor</strong>.
</p>

---

## Table of Contents

- [Platform Overview](#platform-overview)
- [Architecture & Personas](#architecture--personas)
- [Docker Quick Start (2 Minutes)](#docker-quick-start-2-minutes)
- [Default Demo Accounts](#default-demo-accounts)
- [Database Architecture & Pre-Seeded Data](#database-architecture--pre-seeded-data)
- [Docker Architecture & Services](#docker-architecture--services)
- [Essential Docker Commands](#essential-docker-commands)
- [Development vs Production Mode](#development-vs-production-mode)
- [Production Deployment Guide](#production-deployment-guide)
- [Troubleshooting & FAQ](#troubleshooting--faq)

---

## Platform Overview

EduLearn is a production-ready, full-stack educational marketplace and learning management system (LMS). It implements a **3-sided marketplace architecture** connecting Administrators, Instructors (Content Creators), and Students with simulated escrow transactions, automated revenue splits (80% Creator / 20% Platform), interactive video learning, quiz assessments, and verifiable cryptographic certificates.

### Key Highlights
- **1-Click Persona Switcher**: Instantly switch between Admin, Instructors, and Students via the persistent top header bar.
- **20% Platform Fee / 80% Creator Split**: Automatic escrow calculation during student purchases, crediting creator wallet balances in real-time.
- **Distraction-Free Video Classroom**: Custom HTML5 player supporting variable playback speeds (0.75x–2.0x), automatic lesson progress detection, and next-lecture autoplay.
- **Automated Quiz Runner**: Assessment engine with instant client-side grading, passing score thresholds (70%), and answer explanations.
- **Gold-Seal Cryptographic Certificates**: Verifiable credential generation upon 100% course completion with unique QR/verification URL (`CERT-2026-XXXX`).
- **Instructor Studio**: Multi-step visual curriculum builder (sections, video lessons, preview toggles, articles, quizzes), sales ledger, and withdrawal requests.
- **Admin Control Center**: Platform GMV and net profit KPI cards, course moderation queue (Approve & Publish, Reject with feedback, Unpublish), platform fee configuration, payout clearances, and user governance.

---

## Architecture & Personas

```
                     ┌──────────────────────────────────────────────┐
                     │          EduLearn Platform Gateway          │
                     │             (http://localhost:8000)          │
                     └──────────────────────┬───────────────────────┘
                                            │
           ┌────────────────────────────────┼───────────────────────────────┐
           ▼                                ▼                               ▼
┌───────────────────────┐       ┌───────────────────────┐       ┌───────────────────────┐
│     Administrator     │       │      Instructor       │       │        Student        │
│    (Eleanor Vance)    │       │(Alex Rivera / Sarah)  │       │ (John Doe / Emma W.)  │
├───────────────────────┤       ├───────────────────────┤       ├───────────────────────┤
│ • Master KPI Cards    │       │ • Creator Studio      │       │ • Marketplace Catalog │
│ • 20% Fee Adjuster    │       │ • Curriculum Builder  │       │ • Escrow Checkout     │
│ • Moderation Queue    │       │ • 80% Wallet Balance  │       │ • Pro Subscriptions   │
│ • Payout Clearance    │       │ • Withdrawal Requests │       │ • Video Classroom     │
│ • Role & Suspensions  │       │ • Student Roster      │       │ • Interactive Quizzes │
└───────────────────────┘       └───────────────────────┘       │ • Verifiable Certs    │
                                                                └───────────────────────┘
```

---

## Docker Quick Start (2 Minutes)

Deploy the platform application container (Web Application, Nginx, PHP 8.4 FPM) connecting directly to an **external PostgreSQL database** (such as your local PostgreSQL/pgAdmin installation or a managed cloud database).

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (macOS, Windows with WSL2, or Linux)
- [Docker Compose](https://docs.docker.com/compose/) (v2.0 or higher, bundled with Docker Desktop)
- Local or external PostgreSQL server running with database `edulearn`

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/EduLearn.git
cd EduLearn
```

### 2. Prepare Environment Configuration
The repository includes a ready-to-use `.env.docker` configured for external PostgreSQL access:
- On Windows / macOS, `host.docker.internal` allows the container to seamlessly reach your host's local PostgreSQL / pgAdmin.
- Default development credentials: user `postgres`, password `1234`, port `5432`, database `edulearn`.

```bash
# On Linux / macOS:
cp .env.docker .env

# On Windows (PowerShell):
copy .env.docker .env
```

### 3. Launch the Application Container
```bash
docker compose up -d --build
```

Docker will:
1. Build the multi-stage image (compile Vite React frontend + configure PHP 8.4 FPM & Nginx with `pdo_pgsql`).
2. Launch the `edulearn-app` container and connect to your external PostgreSQL instance at `host.docker.internal:5432`.
3. Auto-cache configuration and start Supervisor managing Nginx and PHP-FPM.

### 4. Access the Application
Once the container is up:

| Service | URL | Connection Details |
| :--- | :--- | :--- |
| **EduLearn Application** | [http://localhost:8000](http://localhost:8000) | 1-Click Switcher in header |
| **Database Host (from Container)** | `host.docker.internal:5432` | User: `postgres` / DB: `edulearn` |
| **Database Host (from Host / pgAdmin)** | `localhost:5432` | User: `postgres` / DB: `edulearn` |

---

## Default Demo Accounts

Use the **1-Click Persona Switcher** dropdown in the top announcement bar to instantly log into any of the 5 demo accounts without entering passwords:

| Persona | Name | Email | Role | Features to Explore |
| :--- | :--- | :--- | :--- | :--- |
| **Admin** | Eleanor Vance | `admin@platform.com` | `ADMIN` | Dashboard KPIs, Moderation Queue, Finances, Payout Approvals, User Governance |
| **Instructor** | Alex Rivera | `alex.coder@platform.com` | `INSTRUCTOR` | Creator Studio, Course Builder, $320 Wallet, Request Payout |
| **Instructor** | Sarah Jenkins | `sarah.design@platform.com` | `INSTRUCTOR` | UI/UX Courses, $200 Wallet, Curriculum Editor |
| **Student** | John Doe | `john.doe@platform.com` | `STUDENT` | My Learning, Video Player, Quizzes, Verified Certificate (`CERT-2026-WD89A`) |
| **Student** | Emma Watson | `emma.watson@platform.com` | `STUDENT` | Marketplace, Cart Checkout, Pro Subscription Pass |

---

## Database Architecture & Automatic Seeding

### Automatic Migration & Seeding on Deployment
Whenever EduLearn is deployed (either in **development** or in **production**), the application entrypoint automatically executes:
```bash
php artisan db:ensure-seeded --force
```
- **Automated Schema Migration**: Runs all pending database migrations (`migrate --force`).
- **Empty State Detection**: Checks if the database is newly created or empty (inspects the primary `user` table).
- **Auto-Seeding**: If empty, it runs `db:seed --force` automatically to populate categories, courses, lessons, quizzes, demo users, and platform settings.
- **Idempotent & Safe**: If existing data is detected, seeding is safely skipped so no user records or course progress are ever overwritten or duplicated.
- **Configurable**: Can be controlled via `AUTO_SEED_IF_EMPTY=true` in your environment configuration.

You can also manually trigger this check or run standard artisan commands at any time:
```bash
# Ensure migrated and seeded if empty
php artisan db:ensure-seeded

# Or full reset (caution: drops tables)
php artisan migrate:fresh --seed
```

### 15 Relational Tables Included:
1. `user`: Roles (`ADMIN`, `INSTRUCTOR`, `STUDENT`), wallet balance, avatars, credentials.
2. `category`: Web Development, AI & Machine Learning, UI/UX Design, Cloud & DevOps.
3. `course`: Course metadata, pricing, level, review status (`DRAFT`, `UNDER_REVIEW`, `PUBLISHED`, `REJECTED`).
4. `section`: Course sections and modules.
5. `lesson`: Lectures (`VIDEO`, `ARTICLE`, `QUIZ`), duration, video URLs, free preview flags.
6. `quizquestion`: Multiple-choice assessment questions, JSON options, correct answers, explanations.
7. `attachment`: Lecture downloadable resources.
8. `order`: Platform purchase orders with gross amount, platform cut (20%), instructor net (80%).
9. `orderitem`: Individual purchased course items.
10. `enrollment`: Student course enrollments.
11. `lessonprogress`: Real-time tracking of completed lectures per student.
12. `certificate`: Gold-seal verifiable credentials (`CERT-2026-WD89A`).
13. `review`: Student ratings and testimonials.
14. `payout`: Creator withdrawal requests (`REQUESTED`, `PAID`, `REJECTED`).
15. `platformsetting`: Global platform commission rate (20.0%) and Pro Pass subscription price ($29.99/mo).

---

## Docker Architecture & Services

The platform utilizes a modern containerized design:

```
               ┌────────────────────────────────────────────────────────┐
               │              Docker Network: edulearn-network          │
               │                                                        │
               │  ┌──────────────────────────────────────────────────┐  │
               │  │  Container: edulearn-app (Port: 8000 -> 80)     │  │
               │  │  ┌────────────────┐     ┌─────────────────────┐  │  │
               │  │  │ Nginx (Alpine) │ ──> │ PHP 8.4 FPM         │  │  │
               │  │  │ (Reverse Proxy)│     │ (Laravel + Inertia) │  │  │
               │  │  └────────────────┘     └─────────────────────┘  │  │
               │  │           ▲                                      │  │
               │  │           └───── Managed by Supervisord          │  │
               │  └──────────────────────────┬───────────────────────┘  │
               └─────────────────────────────┼──────────────────────────┘
                                             │ (PDO PostgreSQL Connection)
                                             ▼
               ┌────────────────────────────────────────────────────────┐
               │         External PostgreSQL Database Provider          │
               │                                                        │
               │ • Dev: Local PostgreSQL / pgAdmin (host.docker.internal)│
               │ • Prod: Managed Cloud (Render / Neon / Supabase / RDS) │
               │ • Database: edulearn                                   │
               └────────────────────────────────────────────────────────┘
```

### Key Configuration Files:
- [`Dockerfile`](file:///c:/Users/Noba/Documents/Workspace/EduLearn/Dockerfile): Multi-stage build compiling React assets in Node 20 and packaging with PHP 8.3 FPM, Nginx, and Composer.
- [`docker-compose.yml`](file:///c:/Users/Noba/Documents/Workspace/EduLearn/docker-compose.yml): Production-grade service orchestration with health checks and volume persistence.
- [`docker/nginx/default.conf`](file:///c:/Users/Noba/Documents/Workspace/EduLearn/docker/nginx/default.conf): FastCGI proxy, gzip compression, security headers, and static asset caching.
- [`docker/php/php.ini`](file:///c:/Users/Noba/Documents/Workspace/EduLearn/docker/php/php.ini): 512MB memory limit, 100MB file upload limits, and optimized script execution times.
- [`docker/supervisor/supervisord.conf`](file:///c:/Users/Noba/Documents/Workspace/EduLearn/docker/supervisor/supervisord.conf): Keeps both PHP-FPM and Nginx running simultaneously with automated restart policies.
- [`docker/app/entrypoint.sh`](file:///c:/Users/Noba/Documents/Workspace/EduLearn/docker/app/entrypoint.sh): Automated database connectivity wait loop, app key generator, storage symlinker, and cache optimizer.

---

## Essential Docker Commands

### Container Management
```bash
# Start containers in background
docker compose up -d

# Stop all containers
docker compose down

# Stop and wipe database volume (clean reset)
docker compose down -v

# View container status and health
docker compose ps

# Follow real-time application logs
docker compose logs -f app

# Follow database logs
docker compose logs -f db
```

### Laravel Artisan & Shell Commands
Execute any Laravel command inside the running container without needing PHP on your host:

```bash
# Open interactive bash shell inside app container
docker compose exec app bash

# Run Laravel Artisan commands
docker compose exec app php artisan route:list
docker compose exec app php artisan migrate --status
docker compose exec app php artisan cache:clear

# Run automated tests inside container
docker compose exec app php artisan test

# Open Laravel Tinker interactive REPL
docker compose exec app php artisan tinker
```

### Re-seeding Database
To reset the database back to initial state from the SQL dump or Laravel seeders:
```bash
# Using psql:
docker compose exec -T db psql -U postgres -d edulearn < docker/postgres/init.sql

# Or using Laravel Artisan:
docker compose exec app php artisan migrate:fresh --seed
```

---

## Development vs Production Mode

### Production Mode (Default)
The default `docker compose up -d` builds a self-contained image with pre-compiled Vite assets and production-optimized caches.

### Live Development Mode (Host Volume Mount)
To edit React components, Blade files, or PHP controllers on your host machine and see changes immediately inside Docker without rebuilding:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

This mounts your local workspace directory directly into `/var/www` while isolating container-specific `vendor` and `node_modules`.

---

## Production Deployment Guide

To deploy EduLearn to any cloud platform or VPS (Render, Railway, AWS EC2 / RDS, DigitalOcean, Linode, Hetzner):

### 1. Database Credentials Placement for Production

EduLearn is architected to connect to any external PostgreSQL database provider (e.g., **AWS RDS, Neon, Supabase, Render PostgreSQL, DigitalOcean Managed Database**).

#### Where to Place Credentials:

Depending on your hosting platform, place your database credentials in one of the following locations:

#### Option A: In the Production `.env` (or `.env.docker`) File (VPS / Docker Host)
When deploying via Docker Compose or directly on a server, create `.env` in your project root:

```bash
# --- Application Configuration ---
APP_NAME=EduLearn
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com
APP_KEY=base64:YOUR_GENERATED_APP_KEY

# --- External PostgreSQL Database Credentials ---
DB_CONNECTION=pgsql
DB_HOST=your-production-db-host.neon.tech        # or rds.amazonaws.com, supabase.co, etc.
DB_PORT=5432
DB_DATABASE=edulearn_prod                        # your cloud database name
DB_USERNAME=your_db_username
DB_PASSWORD=YOUR_STRONG_SECURE_PASSWORD
DB_SSLMODE=require                               # required for most cloud providers (Supabase, Neon, RDS)

# Optional single connection URL (supported by Laravel):
# DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
```

#### Option B: Cloud Environment Variables / Secrets Dashboard (Render, Railway, Fly.io, Heroku)
If deploying via a cloud platform with GUI configuration:
1. Navigate to your project's **Environment Variables** / **Secrets** dashboard tab.
2. Add the following environment keys:
   - `DB_CONNECTION`: `pgsql`
   - `DB_HOST`: your external database host domain (e.g., `ep-xyz.us-east-1.aws.neon.tech`)
   - `DB_PORT`: `5432`
   - `DB_DATABASE`: your database name
   - `DB_USERNAME`: your database username
   - `DB_PASSWORD`: your database password
   - `DB_SSLMODE`: `require` (or `prefer`)
   - `APP_KEY`: run `php artisan key:generate --show` to generate a production 32-character key.
   - `APP_URL`: `https://yourdomain.com`

---

### 2. Install Docker on Server (If using self-hosted VPS)
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

### 3. Deploy Application Container
```bash
docker compose up -d --build
```

### 4. Run Initial Migrations & Seeds on Production Database
Run migrations to create the 15 application tables and optional seed demo data:
```bash
# Run database migrations:
docker compose exec app php artisan migrate --force

# (Optional) Seed platform demo data:
docker compose exec app php artisan db:seed --force
```

### 4. Reverse Proxy with SSL (Certbot / Nginx)
Point an external Nginx or Caddy proxy on the server to port `8000` with Let's Encrypt SSL:

```nginx
server {
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Troubleshooting & FAQ

### Port Already in Use (Port 8000, 8080, or 33060)
If your host is already using port 8000 or 8080:
1. Open `.env.docker` (or set environment variables on host).
2. Change the exposed port:
   ```env
   APP_PORT=8085
   PMA_PORT=8086
   DB_FORWARD_PORT=33065
   ```
3. Restart containers: `docker compose up -d`.

### Container Shows "Database not ready yet... Retrying"
PostgreSQL takes roughly 5–15 seconds on its first boot to initialize storage. The `entrypoint.sh` script automatically retries every 2 seconds until the database responds healthy.

### Permissions Issues on Storage
If you encounter file permission errors:
```bash
docker compose exec app chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
docker compose exec app chmod -R 775 /var/www/storage /var/www/bootstrap/cache
```

### Force Rebuild Image
If you make changes to `package.json`, `composer.json`, or Docker configuration:
```bash
docker compose build --no-cache
docker compose up -d
```

---

## License

This project is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).
