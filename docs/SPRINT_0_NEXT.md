# Sprint 0 — Next Steps (execution)

## Done
- Route-level lazy loading
- Bundle chunking (manualChunks)
- Removed client secret exposure in Vite config
- Structured TЗ docs + backlog skeleton

## Next (implementation order)
1. Foundation backend scaffold
   - NestJS API app (auth, workspaces, vacancies, candidates)
   - PostgreSQL schema + migrations
2. Candidate Journey v1
   - Persisted journey model
   - Draft/publish/versioning endpoints
3. Pipeline v1
   - Stages CRUD
   - Candidate stage transitions + SLA timestamps
4. Telegram v1
   - bot setup endpoint
   - trigger notifications for new candidates
5. Non-functional baseline
   - centralized error format
   - request id and audit log prototype

## Definition of Ready for Sprint 1
- API contracts finalized for 5 core modules
- DB entities confirmed
- deployment target selected (staging/prod)
