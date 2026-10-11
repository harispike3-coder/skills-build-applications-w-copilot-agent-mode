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

MongoDB uses port `27017`; the backend database configuration defaults to
`mongodb://localhost:27017/octofit_db`.
