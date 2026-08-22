# Pars Fanavar — Corporate Site

Bilingual (Persian / English) corporate landing page for **Pars Fanavar**,
with a light/dark theme and a consultation-request form backed by a small
FastAPI service.

- **Frontend:** React + JavaScript + Tailwind CSS v4 (Vite)
- **Backend:** FastAPI + SQLite (stdlib `sqlite3`, no external DB needed)
- **Default language:** Persian (`fa`, RTL) with an English (`en`, LTR) toggle
- **Theme:** light / dark, persisted in `localStorage`, respects system preference on first visit

## Project structure

```
pars-fanavar/
├── frontend/          Vite + React + Tailwind v4 app
│   └── src/
│       ├── components/     Header, Hero, Services, MarketPosition, Advantages, Contact/ConsultationForm, Footer, theme+language toggles
│       ├── context/         ThemeContext, LanguageContext
│       └── i18n/            translations.js (fa + en copy)
└── backend/            FastAPI app
    └── app/
        ├── main.py          routes: /api/health, /api/consultations
        ├── models.py        Pydantic request/response models
        └── database.py      SQLite connection + schema
```

## Running locally

### Backend

```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate   # optional but recommended
pip install -r requirements.txt
cp .env.example .env   # adjust FRONTEND_ORIGIN / ADMIN_API_KEY as needed
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server proxies `/api/*` to `http://localhost:8000` (see
`frontend/vite.config.js`), so the form works out of the box in development.

## API

| Method | Path                  | Description                                              |
|--------|-----------------------|------------------------------------------------------------|
| GET    | `/api/health`         | Liveness check                                              |
| POST   | `/api/consultations`  | Create a consultation request (name, company, email, phone, interests[], message, language) |
| GET    | `/api/consultations`  | List requests — requires header `X-Admin-Key`, disabled unless `ADMIN_API_KEY` is set |

## Deploying (Vercel + Render)

This repo is set up to deploy as **frontend on Vercel** + **backend on Render**
(Render gives the backend a persistent disk, which SQLite needs — Vercel's
serverless functions have an ephemeral filesystem and would lose leads).

### 1. Backend → Render

1. Go to [render.com](https://render.com) → **New** → **Blueprint**, connect
   this repo. Render will read `render.yaml` at the repo root and create the
   `pars-fanavar-api` web service with a 1&nbsp;GB persistent disk mounted at
   `backend/data` automatically.
2. In the service's **Environment** tab, set:
   - `FRONTEND_ORIGIN` → your Vercel domain, e.g. `https://pars-fanavar.vercel.app` (comma-separate if you also want a custom domain)
   - `ADMIN_API_KEY` → a random secret, only if you want `GET /api/consultations` enabled
3. Deploy. Note the resulting URL, e.g. `https://pars-fanavar-api.onrender.com`.
4. Confirm it's alive: `curl https://pars-fanavar-api.onrender.com/api/health`

(No blueprint support / prefer manual setup: create a Web Service, root
directory `backend`, build command `pip install -r requirements.txt`, start
command `uvicorn app.main:app --host 0.0.0.0 --port $PORT`, and add a disk
mounted at `backend/data` so the SQLite file survives restarts.)

### 2. Frontend → Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import this GitHub repo.
2. Vercel will pick up the root `vercel.json`, which builds `frontend/` and
   publishes `frontend/dist` — no need to change the Root Directory setting.
3. Add an environment variable:
   - `VITE_API_URL` → the Render backend URL from step 1 (e.g. `https://pars-fanavar-api.onrender.com`, **no trailing slash**)
4. Deploy. Once live, go back to Render and make sure `FRONTEND_ORIGIN`
   matches the exact Vercel URL (including `https://`), then redeploy the
   backend so CORS allows it.

### Alternative: everything on Vercel

Vercel can also run the FastAPI app as a Python serverless function, but the
SQLite file **will not reliably persist** between invocations — submitted
leads can silently disappear. Only do this if you first swap the storage
layer for something external (Vercel Postgres, Supabase, etc.) instead of
`backend/app/database.py`'s local SQLite file.


## Notes

- Contact details in the footer (`info@parsfanavar.ir`, phone number) are
  placeholders — update `frontend/src/i18n/translations.js` (`footer.email`,
  `footer.phone`) with the real values before launch.
