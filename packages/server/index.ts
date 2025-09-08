import express from 'express';
import * as dotenv from 'dotenv';
import router from './routes.js';
import { type CorsOptions } from 'cors';
const cors = require('cors');

dotenv.config();

const app = express();

// 配置 CORS，只允许特定域名访问
const corsOptions: CorsOptions = {
  origin:
    process.env.NODE_ENV === 'development'
      ? ['https://client-olive-rho.vercel.app', 'http://localhost:5173'] // 开发环境允许本地开发
      : ['https://client-olive-rho.vercel.app'], // 生产环境只允许部署的域名
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json()); // act like a middle, parse the json object
app.use(router);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
