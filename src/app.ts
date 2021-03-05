import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';

import routes from './routes';

const app = express();

app.use(express.json());
