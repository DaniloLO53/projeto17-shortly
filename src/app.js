import express from 'express';
import cors from 'cors';
import router from './routes/routers.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(router);

export default app;
