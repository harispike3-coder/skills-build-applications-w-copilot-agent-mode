# OctoFit Tracker

The presentation tier uses React 19, Vite, React Router, and Bootstrap.

## Run the application

Install dependencies and start the frontend on port `5173`:

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```

Start the Express API on port `8000`:

```bash
npm install --prefix octofit-tracker/backend
npm run dev --prefix octofit-tracker/backend
```

For a GitHub Codespace, define `VITE_CODESPACE_NAME` in
`octofit-tracker/frontend/.env.local` using your Codespace name:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite reads this value when it starts, so restart the frontend after changing it.
The frontend uses `https://<name>-8000.app.github.dev` for the API when set and
falls back to `http://localhost:8000` when it is unset. Vite environment values
are included in the client bundle; do not put secrets in this variable.

MongoDB uses port `27017`; the backend database configuration defaults to
`mongodb://localhost:27017/octofit_db`.
