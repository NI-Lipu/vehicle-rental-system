import express, { Request, Response } from 'express';
import initDB from './config/db';

const app=express();

//DATABASE
initDB()

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!');
});
export default app;