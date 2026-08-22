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

## Deploying

- Build the frontend with `npm run build` (outputs to `frontend/dist`) and serve
  it from any static host or behind the same reverse proxy as the API.
- Put the FastAPI app behind a reverse proxy (nginx, Caddy, etc.) that routes
  `/api/*` to `uvicorn`/`gunicorn` and serves the built frontend for everything else.
- Set `FRONTEND_ORIGIN` to your production domain and set `ADMIN_API_KEY` if
  you want to fetch the submitted leads via `GET /api/consultations`.
- The SQLite file lives at `backend/data/pars_fanavar.db` — mount that path
  as a persistent volume in production so leads aren't lost on redeploy.

## Notes

- Contact details in the footer (`info@parsfanavar.ir`, phone number) are
  placeholders — update `frontend/src/i18n/translations.js` (`footer.email`,
  `footer.phone`) with the real values before launch.
