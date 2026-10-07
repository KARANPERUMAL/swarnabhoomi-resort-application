# Swarnabhoomi Farm Stay Website

Premium resort website and enquiry system for Swarnabhoomi Farm Stay.

## Architecture

- `frontend/`: Next.js, React, TypeScript, Tailwind CSS, GSAP, Lenis, Framer Motion, Swiper, Lucide React.
- `backend/`: Java Spring Boot API with validation, JPA persistence, MySQL-ready configuration, CORS, health endpoint, and email notification.
- Browser never connects directly to MySQL. Enquiries flow through the Spring Boot API.

## Enquiry Workflow

Visitor explores the resort and rooms, opens the enquiry form, enters stay dates, guest counts, contact details, gender, selected room, and optional notes. The backend validates the request, recalculates number of nights, stores the enquiry with status `NEW`, sends the manager email when mail is enabled, and returns a success message. The resort team manually contacts the guest and confirms availability.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Production build:

```bash
npm run build
npm run start
```

## Backend Setup

```bash
cd backend
mvn clean test
mvn spring-boot:run
```

For local development, the API can run with the default in-memory H2-compatible configuration. For MySQL, configure:

```env
DB_URL=jdbc:mysql://localhost:3306/swarnabhoomi?createDatabaseIfNotExist=true
DB_USERNAME=root
DB_PASSWORD=change-me
DB_DRIVER=com.mysql.cj.jdbc.Driver
JPA_DDL_AUTO=update
FRONTEND_ORIGIN=http://localhost:3000
```

For production, use the `prod` profile. The initial deployment can use `JPA_DDL_AUTO=update` to create the `enquiries` table. Once the schema is established, use `JPA_DDL_AUTO=validate` and introduce migrations before changing the database schema.

## Email Configuration

Email is disabled by default with `MAIL_ENABLED=false`. Set these variables for a transactional SMTP provider such as Brevo, SendGrid SMTP, Resend SMTP, Amazon SES SMTP, or a business SMTP account:

```env
MAIL_ENABLED=true
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=change-me
MAIL_PASSWORD=change-me
MAIL_FROM=enquiries@swarnabhoomi.example
MANAGER_EMAIL=avaniswarnabhoomi@gmail.com
```

## API

### GET `/api/health`

Response:

```json
{ "status": "UP" }
```

### POST `/api/enquiries`

Request:

```json
{
  "guestName": "John Doe",
  "phone": "+91XXXXXXXXXX",
  "email": "john@example.com",
  "gender": "MALE",
  "adults": 2,
  "children": 1,
  "checkIn": "2026-10-18",
  "checkOut": "2026-10-21",
  "selectedRoom": "Nature View Cottage",
  "message": "Optional request"
}
```

Validation:

- `checkOut` must be after `checkIn`
- `adults` must be at least 1
- `children` cannot be negative
- email must be valid
- backend recalculates `numberOfNights`

Success:

```json
{
  "success": true,
  "enquiryId": 1,
  "message": "Your request has been received. Our resort team will contact you shortly.",
  "numberOfNights": 3
}
```

Error:

```json
{
  "success": false,
  "message": "Check-out must be after check-in."
}
```

## Database Schema

The JPA entity maps to `enquiries` with:

`id`, `guest_name`, `phone`, `email`, `gender`, `adults`, `children`, `check_in`, `check_out`, `number_of_nights`, `selected_room`, `message`, `status`, `created_at`, `updated_at`.

Statuses: `NEW`, `CONTACTED`, `CONFIRMED`, `REJECTED`, `CANCELLED`.

## Asset Organization

Original user assets remain in the repository root. Optimized public web assets are generated into:

- `frontend/public/images/hero`
- `frontend/public/images/resort`
- `frontend/public/images/rooms`
- `frontend/public/images/wellness`
- `frontend/public/images/experiences`
- `frontend/public/images/gallery`
- `frontend/public/images/location`
- `frontend/public/videos/hero`
- `frontend/public/logos`

Run this after changing source assets:

```bash
python scripts/prepare_assets.py
```

Use the bundled Codex Python path if system Python is unavailable.

## Animation Architecture

The frontend uses:

- `SmoothScroll` for Lenis + GSAP ScrollTrigger integration.
- `Hero` for initial cinematic image/video scale and staggered copy reveal.
- `ImageReveal` and `TextReveal` for reusable scroll-triggered editorial reveals.
- Framer Motion for the mobile navigation drawer.
- Reduced-motion media query support in CSS and animation hooks.

## Deployment

Frontend: deploy `frontend/` to Vercel and set `NEXT_PUBLIC_API_URL` to the backend URL.

Backend: deploy `backend/` to Render, Railway, AWS, or another Java-compatible host. Set MySQL, CORS, and mail environment variables in the platform dashboard. Use managed MySQL for production.
