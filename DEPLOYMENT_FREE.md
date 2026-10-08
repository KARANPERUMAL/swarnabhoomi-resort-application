# Free Deployment Guide

This project can run without Railway by splitting the stack:

- Frontend: Vercel free plan
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
DB_DRIVER=org.postgresql.Driver
JPA_DDL_AUTO=update
FRONTEND_ORIGINS=https://YOUR_VERCEL_DOMAIN.vercel.app
MAIL_ENABLED=false
MANAGER_EMAIL=avaniswarnabhoomi@gmail.com
```

After the first successful deploy creates the `enquiries` table, change `JPA_DDL_AUTO` to `validate` for safer production runs.

## Render Backend Settings

- Root directory: `backend`
- Build command: `mvn clean package -DskipTests`
- Start command: `java -jar target/website-0.0.1-SNAPSHOT.jar`
- Health check path: `/api/health`

## Vercel Frontend Settings

- Root directory: `frontend`
- Build command: `npm run build`
- Output: Next.js default
- Environment variable:

```env
NEXT_PUBLIC_API_URL=https://YOUR_BACKEND_DOMAIN.onrender.com
```

After Vercel gives you the final frontend URL, update the backend `FRONTEND_ORIGINS` value with that exact URL.
