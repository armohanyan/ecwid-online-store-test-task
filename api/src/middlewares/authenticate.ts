import { NextFunction, Request, Response } from 'express';
import { admin } from '../firebase';

const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(403).json({ error: 'No token provided' });
    return;
  }

  const idToken = authHeader.split(' ')[1];

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    req.user = await admin.auth().verifyIdToken(idToken);

    next();
  } catch {
    res.status(403).json({ error: 'Unauthorized' });
  }
};

export default verifyToken;
