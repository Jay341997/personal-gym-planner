# Personal Gym Planner

A simple personal gym and diet tracking mobile app for beginner gym users.

## Stack

- React Native with Expo
- TypeScript
- Local-only storage with AsyncStorage

## Features

- 6-day beginner workout split
- Exercise details with form tips, mistakes, and demo links
- Daily workout tracking with notes and weight adjustments
- Beginner weight suggestions
- Simple Indian diet plans
- Progress tracking with lightweight charts
- Workout timer, rest timer, water tracker, BMI calculator, and daily quote

## Run

```bash
npm install
npm start
```

### Web build & PWA

Static export outputs `dist/` and includes:

- **`public/manifest.json`** — installable app metadata (standalone, icons, theme)
- **`public/sw.js`** — service worker for offline-ish caching after the first successful load  
- **`public/icon-192.png`** / **`icon-512.png`** — app icons (regenerate with `python3 scripts/gen-pwa-icons.py` if needed)

```bash
npm run export:web
```

Deploy `dist/` to Netlify or Vercel (see repo config). Install prompts work best over **HTTPS** (including preview URLs).

## Structure

```text
src/
  components/
  data/
  hooks/
  screens/
  theme/
  types/
  utils/
```
