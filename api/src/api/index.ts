import express, { Request, Response } from 'express';
import auth from './auth.api';
import generator from './generate.api';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('ecwid-online-store server is active');
});

app.use('/generate', generator);
app.use('/auth', auth);

export default app;
