import express from 'express';
import * as dotenv from 'dotenv';
import router from './routes.js';
import { type CorsOptions } from 'cors';
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json()); // act like a middle, parse the json object
app.use(router);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
