import express from 'express';
import * as dotenv from 'dotenv';
import router from './routes.js';
import { type CorsOptions } from 'cors';
const cors = require('cors');

dotenv.config();

const app = express();

// 配置 CORS
const corsOptions: CorsOptions = {
  origin: [
    'https://client-olive-rho.vercel.app',
    'http://localhost:5173', // 本地开发
    'http://localhost:3000', // 本地开发备用端口
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json()); // act like a middle, parse the json object
app.use(router);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
