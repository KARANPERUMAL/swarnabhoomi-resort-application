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
MAIL_ENABLED=true
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-gmail-address@gmail.com
MAIL_PASSWORD=your-google-app-password
MAIL_FROM=your-gmail-address@gmail.com
MANAGER_EMAIL=karanperumaln@gmail.com
```

Do not set `DB_DRIVER` or `spring.datasource.driver-class-name` unless you have a special reason. Spring Boot will choose the correct driver from `DB_URL`, which avoids mixing a MySQL URL with an H2 or PostgreSQL driver.

After the first successful deploy creates the `enquiries` table, change `JPA_DDL_AUTO` to `validate` for safer production runs.

## Render Backend Settings

- Use the root `render.yaml` Blueprint in this repository.
- Runtime: Docker
- Root directory: `backend`
- Health check path: `/api/health`
- Secret env values Render will ask for: `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `MAIL_USERNAME`, `MAIL_PASSWORD`

For Gmail notifications, use:

```env
MAIL_ENABLED=true
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-gmail-address@gmail.com
MAIL_PASSWORD=your-google-app-password
MAIL_FROM=your-gmail-address@gmail.com
MANAGER_EMAIL=karanperumaln@gmail.com
```

Use a Google App Password, not your normal Gmail password. If an app password was pasted into chat, revoke it in Google Account settings and create a fresh one before saving it in Render.

Render Free web services block outbound SMTP ports `25`, `465`, and `587`, so Gmail SMTP can fail on Render even when the same settings work on localhost. For the free Render backend, prefer Resend's HTTPS API:

```env
MAIL_ENABLED=true
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM=Swarnabhoomi <your-verified-sender@yourdomain.com>
MANAGER_EMAIL=karanperumaln@gmail.com
```

If you do not have a domain yet, create a free Resend account and use the sender address Resend allows for your test account, then replace `RESEND_FROM` after you verify a real domain.

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
