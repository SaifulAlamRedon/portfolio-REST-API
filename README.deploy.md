Railway deployment notes

- Railway uses `nixpacks` builder. `railway.json` now runs `npm run build && npm run start:prod`.
- Set environment variables in Railway project: `DATABASE_URL`, `NODE_ENV=production`, `PORT` (optional).
- If you use Railway Postgres addon, use the provided `DATABASE_URL`.
- For local testing, create a `.env` with `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`.

Local build and run:

```bash
npm ci
npm run build
npm run start:prod
```
