import { Router } from 'express';
import { createFunction } from '../controllers/helloCreate';
import { getFunction } from '../controllers/helloRead';

const helloRouter = Router();

// SAVE OR UPDATE endpoint
helloRouter.put('/:username', createFunction);
helloRouter.get('/:username', getFunction);

export default helloRouter;
