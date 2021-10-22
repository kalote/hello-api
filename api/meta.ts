import { Request, Response, Router } from 'express';
import mongoose from 'mongoose';

const healthRouter = Router();

healthRouter.get('/health', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'OK' });
});

healthRouter.get('/ready', (req: Request, res: Response) => {
  return mongoose.connection.readyState == 1
    ? res.status(200).json({ message: 'DB OK' })
    : res
        .status(500)
        .json({ message: `DB is in error mode: status ${mongoose.connection.readyState}` });
});

export default healthRouter;
