# Image Site (Vercel)

A minimal image generator website using a Vercel serverless function that calls OpenAI's Images API (`gpt-image-1`).

## Deploy Steps (Quick)
1) Download this zip and push it to a new Git repo (GitHub/GitLab).
2) Go to Vercel -> New Project -> Import your repo.
3) In **Settings → Environment Variables**, add:
   - `OPENAI_API_KEY` = your key
   - (optional) `GATE_PASSWORD` = simple shared password for the form
4) Deploy. Visit your site URL, open `/` (index.html), and try generating an image.

## Local Dev
- You can use `vercel dev` if you have the Vercel CLI installed:
  ```bash
  npm i -g vercel
  vercel dev
  ```

## Notes
- The client calls `/api/generate-image`.
- The serverless function reads `OPENAI_API_KEY` securely on the server side.
- Output is returned as a base64 PNG data URL for instant preview/download.
