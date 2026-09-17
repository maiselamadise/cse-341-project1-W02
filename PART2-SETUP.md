# Part 2 — fixes applied against the grading rubric

Three things were changed in your uploaded repo before this round:

## 1. Swapped `routes/` and `db/` contents
Previously `routes/connect.js` held the DB connection and `db/contacts.js` held the
route handlers — backwards from their folder names. Now:
- `db/connect.js` — MongoDB connection (unchanged logic, just moved + `require` paths updated)
- `routes/contacts.js` — GET/POST/PUT/DELETE routes (unchanged logic, just moved)

This makes the MVC separation unambiguous for the Architecture rubric line.

## 2. Removed the hardcoded `localhost:3000` host from Swagger
`swagger.js` no longer sets a `host` on the generated doc. This means the same
`swagger-output.json` works correctly both locally and on Render — Swagger UI's
"Try it out" sends requests to whatever origin actually served the page, instead of
always trying to hit `localhost:3000` (which would silently fail once you're testing
against your deployed Render URL).

**You do still need to regenerate this file locally whenever routes change:**
```
node swagger.js
```
then commit the updated `swagger-output.json`. You do NOT need to set any
environment variable for the host anymore — it's handled automatically.

## 3. Seed data increased from 3 to 5 contacts
`seed.js` now inserts 5 contacts instead of 3, matching the rubric's "at least five
records" requirement for full credit on the Database criterion. Re-run:
```
npm run seed
```
against your real database (only do this once, or you'll get duplicates — check
Compass first if you already seeded 3).

## Everything else from before still applies
- Install deps: `npm install swagger-ui-express` and `npm install --save-dev swagger-autogen`
- Test locally with `contacts.rest` (POST → copy the id → GET/PUT/DELETE that id)
- Push to GitHub, let Render redeploy, then re-test `/api-docs` **on the Render URL**
  before recording your video — confirm "Try it out" actually executes successfully
  against the live database, not just that the docs page loads.
