import express, { Request, Response } from 'express';
import initDB from './config/db';
import { authRoutes } from './modules/auth/auth.routes';

const app=express();

//Parse
app.use(express.json());

//DATABASE
initDB()

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!');
});

//Auth Route
app.use('/api/v1/auth', authRoutes)


export default app;