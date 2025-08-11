import * as path from 'node:path';
import express, { Request, Response } from 'express';
import exportApi from "./export.api";

const app = express();

app.use('/export', exportApi);

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'))
})

export default app;
