import http from 'http';
import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import router from './routes/routers.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(router);

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
