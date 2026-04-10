

# ResQ - Pakistan's Real-Time Safety & Crisis Alert Platform

## Overview
A bento-grid style dashboard with 3D claymorphism/glassmorphism aesthetic, optimized for Pakistani users with English/Urdu multilingual support. Built with React, Tailwind, Framer Motion, Lucide React, and Shadcn/UI.

## Design System
- **Aesthetic**: Soft shadows, 24px+ rounded corners, glass effects with backdrop blur, 3D depth via layered shadows
- **Colors**: Alert Red (#EF4444), Safety Green (#10B981), Info Blue (#3B82F6), Trust Gold (#F59E0B), dark neutral backgrounds
- **Animations**: Framer Motion for page transitions, pulsing live indicators, hover scale effects on cards
- **Typography**: Inter for English, Noto Nastaliq Urdu for Urdu text, with RTL support when Urdu is active

## Atomic Design Structure

### Atoms
- **Buttons**: Primary, Secondary, SOS (large pulsing red emergency button)
- **Badges**: Verified (gold), Unverified (gray), severity levels
- **Trust Ring**: Animated SVG progress ring showing AI trust percentage
- **Live Indicator**: Pulsing dot with "LIVE" label
- **Typography components** with automatic Urdu/English font switching

### Molecules
- **Crisis Card**: Bento-style glass card with title, time ago, location, severity badge, and trust score ring
- **Language Selector**: Toggle between English 🇬🇧 and Urdu 🇵🇰 with flag icons
- **Search Bar**: Glassmorphic search input with filter chips
- **Route Item**: Safe/blocked route with 3D icons and status indicators

### Organisms
- **Live Crisis Feed**: Scrollable list of crisis cards with skeleton loaders, "LIVE" pulse indicator, filter tabs (All/Floods/Earthquakes/Security)
- **Safety Map Placeholder**: Styled map area with placeholder noting GIS API integration point, showing mock shelter/route markers
- **Community Reporting Hub**: Multi-step form for text, voice (waveform visualizer), or image upload
- **AI Trust Score Panel**: Summary of verification stats
- **Safe Route Sidebar**: List of alternative routes with clear/blocked status and 3D directional icons
- **Voice Alert Waveform**: Animated waveform bars simulating multilingual voice alerts

### Templates
- **Dashboard Layout**: Sidebar navigation + main bento grid area + floating SOS button (fixed bottom-right)

## Pages

### Main Dashboard (Index)
Bento grid layout with:
- **Top row**: Live Crisis Feed (2/3 width) + AI Trust Summary (1/3)
- **Middle row**: Interactive Safety Map (1/2) + Community Reporting Hub (1/2)
- **Bottom row**: Safe Route Visualizer (1/3) + Voice Alert Interface (1/3) + Quick Stats (1/3)
- **Floating SOS button** always visible
- **Language toggle** in header

## Key Features
1. **Multilingual i18n system** — Context-based translation provider switching all labels between English and Urdu, with RTL layout support for Urdu
2. **AI Trust Score UI** — Every crisis card shows an animated progress ring with percentage and "AI Verified" badge
3. **Voice Waveform Component** — Animated bars simulating audio playback with play/pause controls
4. **Safe Route Sidebar** — Route list with green (clear) / red (blocked) indicators and mock distance/time data
5. **Skeleton Loaders** — Shimmer loading states for crisis feed cards
6. **Responsive** — Mobile-first with stacked bento grid on small screens, sidebar collapses to bottom nav
7. **Code comments** marking NLP API, GIS API, and voice API integration points

## Technical Notes
- Framer Motion for all animations (page transitions, card hover, pulse effects)
- CSS custom properties for the color palette integrated into Tailwind config
- Translation context with `useTranslation` hook
- Mock data for crises, routes, and trust scores
- All components fully typed with TypeScript

