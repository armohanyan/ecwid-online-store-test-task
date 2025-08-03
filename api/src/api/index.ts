import express, { Request, Response } from 'express';
import * as path from 'node:path';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../../../client/dist/index.html'));
});

export default app;
