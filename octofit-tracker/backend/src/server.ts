import cors from 'cors';
import express from 'express';
import { connectDatabase } from './config/database.js';
import resourceRoutes from './routes/resources.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const allowedOrigins = new Set([
  'http://localhost:5173',
  ...(codespaceName
    ? [`https://${codespaceName}-5173.app.github.dev`]
    : []),
]);
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin is not allowed by CORS.'));
    },
  }),
);
app.use(express.json());
app.use(resourceRoutes);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use(
  (
    error: unknown,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error('API request failed:', error);
    response.status(500).json({ error: 'Internal server error' });
  },
);

async function startServer(): Promise<void> {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`OctoFit API listening at ${baseUrl}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Failed to start OctoFit API:', error);
  process.exitCode = 1;
});
