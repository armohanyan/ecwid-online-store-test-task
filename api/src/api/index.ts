import * as path from 'node:path';
import express, { Request, Response } from 'express';

const app = express();

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'))
})

export default app;
