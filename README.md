<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/07c2f8a9-7110-4600-ae04-d79eb19dd2a6

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Create `.env.local` from `.env.example` (optional)
3. Run the app:
   `npm run dev`

## Sprint 0 updates
- Route-level code splitting enabled.
- Build chunking configured (`react`, `charts`, `dnd`).
- Removed client-side secret exposure from Vite config.
- Added mock backend scaffold (`server/index.ts`) with core endpoints.

## Mock API run (dev)
```bash
npm run dev:api
```
Available endpoints:
- `GET /health`
- `GET/POST /api/vacancies`
- `GET/POST /api/candidates`
- `GET /api/workspaces`
- `GET /api/pipeline/stages`
