import * as path from 'node:path';
import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../../public/dist/index.html'));
});

export default app;
