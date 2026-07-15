# Hewaya Link

**"Hewaya" (هواية) means "hobby" in Arabic.** Hewaya Link is a MERN social platform for hobbyists — a place to write about a hobby, share photos of it, join a community built around it, and rate/discuss what other people share, instead of that content being scattered across general-purpose social apps.

## Features

- Blog posts with a rich text editor (TinyMCE)
- Photo gallery with a masonry layout
- **Portals** — hobby-specific community groups users can subscribe to
- Ratings and comments on shared content
- Role-based accounts (admin / moderator / user) with a dedicated moderation view
- Built-in FAQ chatbot
- Bilingual UI (Arabic/English) via i18next, with a dark/light theme toggle
- Email verification and password reset (via Elastic Email)
- Cloudinary-hosted image uploads
- A separate admin dashboard for managing users, categories, tags, and portals

## Structure

This is a monorepo with three apps:

| Folder | What it is |
|---|---|
| `backend/` | Express + MongoDB API |
| `frontend/` | React (Vite) user-facing site |
| `Hewaya-admin/` | Separate Next.js 14 admin dashboard |

## Tech stack

**Backend:** Node.js, Express, MongoDB/Mongoose, JWT auth, bcrypt, Cloudinary + Multer (uploads), Elastic Email (transactional email), express-validator/Joi

**Frontend:** React 18, Redux Toolkit, React Router, Bootstrap/react-bootstrap, TinyMCE, i18next, react-chatbot-kit, react-masonry-css

**Admin dashboard:** Next.js 14, Recharts — bootstrapped from a public Next.js dashboard tutorial and adapted with this project's own data (users, categories, tags, portals)

## Getting started

```bash
git clone https://github.com/EntisarOsiami/Hewaya_Link.git
cd Hewaya_Link
npm install
cp .env.example .env   # fill in real values, see below
npm run dev             # runs backend + frontend together
```

The admin dashboard runs separately:

```bash
cd Hewaya-admin
npm install
cp .env.example .env
npm run dev
```

## Environment variables

**Root `.env` (backend):**

| Variable | Purpose |
|---|---|
| `PORT` | Port the API listens on |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign auth tokens |
| `CLIENT_URL` | URL of the frontend, used for CORS/redirects |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Cloudinary credentials for image uploads |
| `ELASTIC_EMAIL_USERNAME` / `ELASTIC_EMAIL_PASSWORD` | Elastic Email credentials for verification/reset emails |
| `NODE_ENV` | `development` or `production` |

**`Hewaya-admin/.env`:**

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | Same MongoDB connection string as the backend |

## What I'd improve

- Add a test suite — there currently isn't one
- The admin dashboard depends on `next-auth` but doesn't actually use it (login is a custom form) — either wire it up properly or drop the dependency
- Root `package.json` mixes backend and frontend dependencies together even though `frontend/` has its own `package.json` — worth splitting cleanly
- Update dependencies — several (Next.js 14, Vite 4, a few transitive packages) are behind on security patches
- Add proper API documentation

## Team

Originally built by:

- **[انتصار العتيبي](https://github.com/EntisarOsiami)**
- **[Adel Alotaibi](https://github.com/AdelAlotaibi050)**
