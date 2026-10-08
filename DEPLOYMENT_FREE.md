# Free Deployment Guide

This project can run without Railway by splitting the stack:

- Frontend: Vercel or Cloudflare Pages
- Backend: Render free web service, or another free Java host
- Database: Neon free PostgreSQL

## Backend Environment Variables

Use these for a PostgreSQL production database:

```env
SPRING_PROFILES_ACTIVE=prod
PORT=8080
DB_URL=jdbc:postgresql://YOUR_NEON_HOST/YOUR_DATABASE?sslmode=require
DB_USERNAME=YOUR_NEON_USER
DB_PASSWORD=YOUR_NEON_PASSWORD
JPA_DDL_AUTO=update
FRONTEND_ORIGINS=https://swarnabhoomi-resort-application.vercel.app
MAIL_ENABLED=false
MANAGER_EMAIL=avaniswarnabhoomi@gmail.com
```

Do not set `DB_DRIVER` or `spring.datasource.driver-class-name` unless you have a special reason. Spring Boot will choose the correct driver from `DB_URL`, which avoids mixing a MySQL URL with an H2 or PostgreSQL driver.

After the first successful deploy creates the `enquiries` table, change `JPA_DDL_AUTO` to `validate` for safer production runs.

## Render Backend Settings

- Use the root `render.yaml` Blueprint in this repository.
- Runtime: Docker
- Root directory: `backend`
- Health check path: `/api/health`
- Secret env values Render will ask for: `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`

## Cloudflare Pages Frontend Settings

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `out`
- Environment variable:

```env
NEXT_PUBLIC_API_URL=https://YOUR_BACKEND_DOMAIN.onrender.com
```

If you deploy the frontend to a different domain later, update the backend `FRONTEND_ORIGINS` value with that exact origin.

## GitHub Pages Alternative

GitHub Pages can also host the exported frontend for free. Use `frontend/out` as the published static folder after running:

```bash
cd frontend
npm run build
```
