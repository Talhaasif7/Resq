# ResQ — Pakistan's Real-Time Safety & Crisis Alert Platform

ResQ is a bilingual (English / Urdu), AI-augmented crisis intelligence dashboard designed for Pakistan. It aggregates live disaster signals, lets citizens and verified volunteers report incidents, surfaces AI-verified trust scores, broadcasts voice alerts, and routes people to safety in real time.

This README documents **every component, page, context, and feature** implemented in the project so far.

---

## 📑 Table of Contents

1. [Tech Stack](#tech-stack)
2. [Design System](#design-system)
3. [Application Routes](#application-routes)
4. [Pages](#pages)
5. [Contexts (Global State)](#contexts-global-state)
6. [Atoms](#atoms)
7. [Molecules](#molecules)
8. [Organisms](#organisms)
9. [Shared Components](#shared-components)
10. [Mock Data Layer](#mock-data-layer)
11. [Branding & Metadata](#branding--metadata)

---

## Tech Stack

- **Framework:** React 18 + Vite 5 + TypeScript 5
- **Styling:** Tailwind CSS v3 with HSL semantic design tokens
- **Animations:** Framer Motion (smooth, GPU-accelerated, flicker-free)
- **Routing:** React Router DOM
- **State / Data:** TanStack React Query, React Context
- **UI Primitives:** shadcn/ui (Radix UI based)
- **Icons:** lucide-react
- **Fonts:** Inter (body) + JetBrains Mono (display/mono accents)

---

## Design System

Defined in `src/index.css` and `tailwind.config.ts`:

- **Aesthetic:** Apple-style glass + gradient, information-dense layout.
- **Accent palette:** Deep emerald (`--primary`) + amber accents.
- **Semantic tokens:** `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--alert`, `--safety`, `--trust`, `--info`, `--card`, `--border`, etc.
- **Glassmorphism utility:** `.glass-card` — a reusable card surface with translucent background, soft border, and subtle elevation used across all dashboard widgets.
- **Dark / Light mode:** Full theme support with HSL tokens swapped via `:root` / `.dark`. Toggled by `ThemeToggle`.
- **Typography:** Display headings use a distinct face (`font-display`); body uses Inter; numbers/labels use JetBrains Mono for a technical feel.
- **Motion principles:** No `backdrop-blur` over animated content (prevents flicker), `will-change: transform` on floating layers, no scroll-driven `useTransform` in heavy subtrees.

---

## Application Routes

Configured in `src/App.tsx` (wrapped in `AuthProvider`, `TooltipProvider`, `BrowserRouter`, and `QueryClientProvider`):

| Path | Component | Protection |
|------|-----------|------------|
| `/` | `Index` → renders `Landing` | Public |
| `/signin` | `SignIn` | Public |
| `/signup` | `SignUp` | Public |
| `/dashboard` | `Dashboard` | Auth required |
| `/verification` | `Verification` | Auth required + role `volunteer` |
| `/profile` | `Profile` | Auth required |
| `/shelters` | `Shelters` | Public |
| `/qa` | `QA` | Public |
| `*` | `NotFound` | Public catch-all |

---

## Pages

### `Landing.tsx` (`/`)
The marketing front door for ResQ.

- **Hero section:** Bold headline, gradient aurora glows, animated floating chips (e.g. "AI Verified", "Voice Alerts in Urdu · EN"), and a stylized dashboard preview card.
- **Feature highlights:** Section under the hero showcasing key product pillars — AI verification, multilingual voice alerts (Urdu + English only, per branding), live crisis feed, safe routing, and community reporting.
- **Stay informed CTA:** Subscription/awareness band (no underline divider — kept clean).
- **Performance:** Floating chips use solid `bg-card` (no `backdrop-blur` over motion) and `will-change: transform` to eliminate flicker. No scroll-linked transforms on the hero subtree.

### `Index.tsx` (`/`)
Thin wrapper that renders the `Landing` page (kept separate so the Vite default index pattern stays intact).

### `Dashboard.tsx` (`/dashboard`)
The core operations surface — a bento-grid layout aggregating every live module.

Layout (in order):
1. **Sticky header** — logo, global search, links to Shelters and Q&A, `ThemeToggle`, `VoiceLanguageSettings`, and either an avatar (linking to `/profile`) or a Sign-In button.
2. **Row 1:** `LiveCrisisFeed` (2/3 width) + `AITrustPanel` (1/3).
3. **Row 2:** `CrisisMapRoutes` — full width.
4. **Row 3:** `InteractiveMap` + `CommunityReporting`.
5. **Row 4:** `SafeRouteSidebar` + `VoiceAlertWaveform` + `QuickStats`.
6. **Floating elements:** `LiveChatBox`, `SubmitCrisisAlert` (bottom-left), `SOSButton` (bottom-right).

Wrapped in `LanguageProvider` so every widget can use the bilingual `t()` translator.

### `SignIn.tsx` (`/signin`)
Email/password sign-in form using `useAuth().signIn`. Persists session to `localStorage` on success and redirects to `/dashboard`.

### `SignUp.tsx` (`/signup`)
Account creation form collecting `name`, `email`, `city`, and `role` (`citizen` or `volunteer`). Calls `useAuth().signUp` and routes the user onward (volunteers are nudged toward `/verification`).

### `Verification.tsx` (`/verification`)
Volunteer-only KYC/credentials page. Lets verified volunteers track and update their `verificationStatus` (`pending`, `verified`, `rejected`, `unsubmitted`) via `updateVerification`.

### `Profile.tsx` (`/profile`)
Authenticated user profile showing name, city, role, join date, reports submitted, trust score, and a sign-out action.

### `Shelters.tsx` (`/shelters`)
Public directory of active shelters with capacity, location, and status indicators — surfaced from mock data.

### `QA.tsx` (`/qa`)
FAQ / knowledge base. Includes the answer to **"How do voice alerts work?"** which now references **only Urdu and English** (per the latest brand decision — Pashto/Sindhi/Punjabi removed).

### `NotFound.tsx` (`*`)
Friendly 404 fallback.

---

## Contexts (Global State)

### `AuthContext.tsx`
Mock auth provider backed by `localStorage` (key: `resq_user`).

- **`User` shape:** `id`, `name`, `email`, `city`, `role` (`volunteer | citizen`), `verificationStatus`, `avatar?`, `joinedAt`, `reportsSubmitted`, `trustScore`.
- **API:** `signIn(email, password)`, `signUp(data)`, `signOut()`, `updateVerification(status)`, plus reactive `user` and `isAuthenticated`.
- **Mock identity:** Defaults to a verified volunteer ("Talha Asif", Lahore, trust 92) for demo flows.

### `LanguageContext.tsx`
Bilingual translator for **English ↔ Urdu**.

- Exposes `language`, `setLanguage`, and `t(key)`.
- Translation dictionary covers every dashboard label: app name, crisis categories, trust labels, map placeholders, reporting actions, route status, voice alerts, SOS, search, stats, etc.
- Drives RTL-friendly text where needed (`ms-auto`, etc.).

---

## Atoms

### `LiveIndicator.tsx`
Pulsing red dot + "LIVE" label, used in the crisis feed header to signal real-time data.

### `SOSButton.tsx`
Large floating circular emergency button (bottom-right of dashboard). Animated pulse rings, alert-colored, intended to trigger the emergency flow.

### `SeverityBadge.tsx`
Color-coded pill rendering crisis severity: `critical` (alert red), `high` (amber), `moderate` (info blue).

### `TrustRing.tsx`
SVG circular progress ring visualizing AI trust score (0–100) with a numeric center label and emerald accent stroke.

---

## Molecules

### `CrisisCard.tsx`
A single crisis item in the live feed. Shows title (bilingual), location, `SeverityBadge`, `TrustRing`, time-ago, and a verified checkmark when applicable. Animated in with a staggered Framer Motion entry.

### `CrisisCardSkeleton.tsx`
Shimmer skeleton matching the `CrisisCard` layout — shown for ~1.5s while the feed simulates an NLP API fetch.

### `LanguageSelector.tsx`
Dropdown to switch between English and Urdu. Wired into `LanguageContext`.

### `VoiceLanguageSettings.tsx`
Header gear-style dropdown that controls the voice-alert language preference. **Limited to Urdu and English only** (per latest spec).

---

## Organisms

### `LiveCrisisFeed.tsx`
The dashboard's primary feed.

- Header with title + `LiveIndicator`.
- Filter pills: **All / Floods / Earthquakes / Security**, fully translated.
- Skeleton loaders during simulated fetch.
- Renders a scrollable list of `CrisisCard`s from `mockCrises`.
- All copy bilingual via `t()`.

### `AITrustPanel.tsx`
AI verification panel. Visualizes how each crisis report is scored (NLP-based mock), surfaces an aggregate trust gauge, and lists recently verified incidents — reinforcing the "trustworthy alerts" promise.

### `InteractiveMap.tsx`
Mounted inside `ErrorBoundary`. A GIS-ready map placeholder with marker pins for active incidents. Acts as the integration point for a real mapping service (Mapbox / Google Maps / Leaflet).

### `SafetyMap.tsx`
Specialized safety overlay map (used on dedicated safety views) showing safe zones vs. danger zones.

### `CrisisMapRoutes.tsx`
Full-width combined map showing live crises **and** overlaid safe/blocked routes — the dashboard's hero visualization.

### `CommunityReporting.tsx`
The "report something" hub on the dashboard. Lets users submit a report via **Text**, **Voice**, or **Image**, with the appropriate input affordance for each type.

### `SubmitCrisisAlert.tsx`
Floating bottom-left action that opens a focused modal/sheet for filing a new crisis alert (description + location), separated from the CommunityReporting widget so it's reachable from anywhere on the dashboard.

### `SafeRouteSidebar.tsx`
Compact list of alternative routes — each row shows from → to, distance, ETA, a `clear` / `blocked` status pill, and a reason note when blocked. Animated entry per item.

### `VoiceAlertWaveform.tsx`
Animated audio waveform visualization for outgoing voice alerts. Displays language chips for **English** and **Urdu** only (Pashto and Sindhi were intentionally removed).

### `QuickStats.tsx`
Four-tile KPI grid: **Active Crises**, **Verified Reports**, **Shelters Open**, **Routes Updated** — each with a themed icon (alert / safety / trust / info), large numeric value, and translated label. Animated in with a staggered scale.

### `LiveChatBox.tsx`
Floating chat widget for live coordination between citizens, volunteers, and responders. Persistent across the dashboard.

---

## Shared Components

### `ThemeToggle.tsx`
Switches between light and dark themes (toggles the `.dark` class on `<html>`).

### `NavLink.tsx`
Styled `react-router-dom` link with active-state styling for header navigation.

### `ProtectedRoute.tsx`
Route guard. Accepts an optional `requireRole` prop. Redirects unauthenticated users to `/signin` and redirects authenticated users without the required role away from restricted pages (used for `/verification` which requires `volunteer`).

### `ErrorBoundary.tsx`
React error boundary used to isolate failures in heavy widgets (notably `InteractiveMap`) so a single broken module never takes down the dashboard.

### `components/ui/*`
Full shadcn/ui primitive library (accordion, alert-dialog, button, card, dialog, dropdown-menu, form, input, popover, select, sheet, sidebar, sonner, toast, tooltip, etc.) — used as the styled base for every higher-level widget.

---

## Mock Data Layer

`src/data/mockData.ts` exports:

- **`Crisis`** type + `mockCrises` array — bilingual title/location, category, severity, trust score, time-ago, verified flag. Drives `LiveCrisisFeed` and the trust panel.
- **`SafeRoute`** type + `mockRoutes` array — from/to, status (`clear` / `blocked`), distance, ETA, optional blockage reason. Drives `SafeRouteSidebar` and `CrisisMapRoutes`.
- **`mockStats`** — counts for the `QuickStats` tiles.
- **Shelter data** — for the `Shelters` page.

These act as drop-in replacements for future real APIs (NLP crisis classifier, GIS routing service, shelter directory).

---

## Branding & Metadata

- **App name:** ResQ
- **Favicon:** `public/favicon.png` — emerald shield mark (replaced the default Vite favicon).
- **`<title>`:** *"ResQ — Real-Time Crisis Intelligence for Pakistan"*
- **Meta description:** SEO-tuned line emphasizing real-time, AI-verified, bilingual crisis alerts for Pakistan.
- **Voice languages:** **Urdu + English only** — consistently enforced across `Landing`, `VoiceAlertWaveform`, `VoiceLanguageSettings`, and `QA`.

---

## Project Conventions

- Always use **semantic Tailwind tokens** (`text-foreground`, `bg-card`, `text-alert`, etc.) — never raw colors.
- All colors stored as **HSL** in `index.css`.
- Atomic design folder layout: `atoms/` → `molecules/` → `organisms/` → `pages/`.
- Every dashboard widget is wrapped in `.glass-card` for visual consistency.
- Animations use Framer Motion with care to **avoid flicker**: no `backdrop-blur` over animated content, `will-change: transform` on motion layers, no scroll-linked transforms in large subtrees.
- Bilingual by default — every user-facing string flows through `t()` in `LanguageContext`.
