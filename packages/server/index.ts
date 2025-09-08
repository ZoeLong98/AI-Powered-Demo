import express from 'express';
import * as dotenv from 'dotenv';
import router from './routes.js';

dotenv.config();

const app = express();

// CORS configuration
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // Backup port
    'https://client-olive-rho.vercel.app/',
    process.env.CLIENT_URL, // Production frontend URL
  ].filter(Boolean) as string[];

  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }

  next();
});

app.use(express.json()); // act like a middle, parse the json object
app.use(router);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
