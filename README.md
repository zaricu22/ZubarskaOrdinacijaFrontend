# ZubarskaOrdinacijaFrontend

[![CI/CD](https://github.com/zaricu22/ZubarskaOrdinacijaFrontend/actions/workflows/ghpages-build.yml/badge.svg)](https://github.com/zaricu22/ZubarskaOrdinacijaFrontend/actions/workflows/ghpages-build.yml)
[![Angular](https://img.shields.io/badge/Angular-17-DD0031?logo=angular)](https://angular.dev)

An Angular 17 single-page application for managing a dental clinic — appointments, dentists, and patients.

---

## Live Demo

[https://zaricu22.github.io/ZubarskaOrdinacijaFrontend/](https://zaricu22.github.io/ZubarskaOrdinacijaFrontend/)

> First API call may take ~2 minutes — backend runs on Render free tier.

---

## Features

| Screen | What you can do |
|---|---|
| Login | Authenticate to access the clinic system (`/`) |
| Dentist view | Manage appointments and patient schedule (`/zubar`) |
| Patient view | Browse and manage personal appointments (`/pacijent`) |

---

## Tech Stack

| | Technology |
|---|---|
| Framework | Angular 17.1 — NgModule-based components |
| Language | TypeScript 5.3 |
| UI | Bootstrap 5.3 |
| Reactivity | RxJS 7.8 |
| HTTP | Angular `HttpClient` |
| Unit tests | Karma + Jasmine |
| CI/CD | GitHub Actions → GitHub Pages |

---

## Test Accounts

| ID Number | Name | Role |
|-----------|------|------|
| `0213456789` | Janko Jankovic | pacijent |
| `02144556677` | Paja Pajic | pacijent |
| `432543` | Filip Filipovic | zubar |

---

## Prerequisites

- **Node.js 20+** — `node --version`
- **npm 9+** — `npm --version`
- **Angular CLI 17** — `npm install -g @angular/cli@17`

---

## Installation

```bash
git clone https://github.com/zaricu22/ZubarskaOrdinacijaFrontend.git
cd ZubarskaOrdinacijaFrontend
npm ci
```

---

## Running Locally

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200).

---

## CI/CD Pipeline

Every push to `main` triggers a build (`ng build --base-href`) and deploys the `browser/` output to the `gh-pages` branch via `peaceiris/actions-gh-pages`.
> GitHub Pages must be configured: **Settings → Pages → Source: `gh-pages` branch, `/ (root)`**.

---

## Environment Variables

Compile-time environment files in `src/environments/`.

| Variable | Dev | Prod |
|---|---|---|
| `apiUrl` | `http://localhost:8080` | `https://zubarska-ordinacija-service.onrender.com` |

---

## API Connection

Base URL (prod): `https://zubarska-ordinacija-service.onrender.com/OrdinacijaREST`

| Area | Method | Endpoint | Service |
|---|---|---|---|
| Auth — check credentials | `GET` | `/korisnikProvera/:id` | `PrijavaService` |
| Auth — register | `POST` | `/korisnikUnos` | `PrijavaService` |
| Dentist — appointments by day | `GET` | `/pregledTerminaZubarDan/:datum` | `ZubarService` |
| Dentist — appointments by period | `GET` | `/pregledTerminaZubarPeriod` | `ZubarService` |
| Dentist — schedule appointment | `POST` | `/zakazivanjeTermina` | `ZubarService` |
| Dentist — cancel appointment | `PUT` | `/otkazivanjeTermina/:datum` | `ZubarService` |
| Dentist — update cancellation deadline | `PUT` | `/promeniRokOtkazivanja/:rok` | `ZubarService` |
| Patient — upcoming appointments | `GET` | `/pregledNeisteklihTerminaPacijent` | `PacijentService` |
| Patient — schedule appointment | `POST` | `/zakazivanjeTermina` | `PacijentService` |
| Patient — cancel appointment | `PUT` | `/otkazivanjeTermina/:datum` | `PacijentService` |

Backend repository: [zaricu22/ZubarskaOrdinacijaBackend](https://github.com/zaricu22/ZubarskaOrdinacijaBackend)

---

## Roles

| Role (`tipKorisnika`) | Access |
|---|---|
| `zubar` | `/zubar` — dentist dashboard |
| `pacijent` | `/pacijent` — patient dashboard |

Role verification is done **server-side**: `PrijavaGuardService` calls `GET /OrdinacijaREST/proveraTipaKorisnika/:id/:tip` before activating each route.

---

## Domain Model

| Model | Fields |
|---|---|
| `Korisnik` | User — identity and login credentials |
| `Termin` | Appointment — `tipPregleda` (type), `status`, `trajanje` (duration in minutes), `termin` (date/time), `korisnik` |

---

## Folder Structure

```
src/app/
├── components/
│   ├── prijava/      # Login page — root route (/)
│   ├── zubar/        # Dentist dashboard (/zubar) — canActivate: PrijavaGuardService
│   └── pacijent/     # Patient dashboard (/pacijent) — canActivate: PrijavaGuardService
├── model/
│   ├── korisnik.ts   # User model
│   └── termin.ts     # Appointment model
└── services/
    ├── prijava.service.ts        # Authentication
    ├── prijava-guard.service.ts  # Route guard
    ├── zubar.service.ts          # Dentist data
    └── pacijent.service.ts       # Patient data
```
