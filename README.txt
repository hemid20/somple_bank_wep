
Simple Bank - Ready to deploy

Folders:
- backend/ : Node.js express server (run with `npm install` then `npm start`)
- public/ : Frontend static files (served by server)

Quick local run:
1. cd backend
2. npm install
3. npm start
4. Open browser to http://localhost:3000

Deploying online (quick options):
Option A - Railway (recommended):
1. Create a GitHub repo and push this project (root contains 'backend' folder).
2. Go to https://railway.app, sign in, New Project -> Deploy from GitHub -> select repo.
3. Railway auto-detects Node.js. Set start command to `npm start` if needed.
4. Deploy and open the generated domain.

Option B - Render:
1. Push to GitHub. In Render dashboard create New -> Web Service -> Connect repo.
2. Set the Build Command: `npm install`
3. Set Start Command: `npm start` and set the root directory to `backend` if required.
4. Deploy.

Option C - Vercel (serverless):
Vercel prefers serverless functions; you can convert routes to API functions or use the `vercel.json` config.
See Vercel docs for Express deployments.

Security note: This project stores data in a plain text file (bank.txt) — OK for testing only. Do NOT use for real money or personal data in production.
