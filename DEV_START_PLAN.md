# Recruter — Development Start Plan

## Current status
- Repo cloned and dependencies installed.
- Typecheck/lint: PASS
- Production build: PASS
- Warning: large JS bundle (~738 kB minified)

## Immediate priorities (Sprint 0)
1. Product requirements freeze
   - clarify MVP scope and first user flow.
2. Technical hardening
   - remove unused server deps from frontend if not needed.
   - environment variable audit.
3. Performance
   - route-level code splitting (lazy pages).
   - reduce initial bundle.
4. Conversion baseline
   - define key events and analytics hooks.
5. Deploy confidence
   - add runbook + smoke test checklist.

## Questions needed from product owner
- Who is primary user: recruiter, hiring manager, agency owner?
- What is #1 action we optimize for in v1?
- Which modules are mandatory first: Candidates / Jobs / Analytics / Journey Builder?
