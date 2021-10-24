import { Router, Request, Response } from 'express';
import { Hello } from '../model/hello';
import moment from 'moment';
import { createFunction } from '../controllers/helloCreate';
import { getFunction } from '../controllers/helloRead';

const helloRouter = Router();

// SAVE OR UPDATE endpoint
helloRouter.put('/:username', createFunction);
helloRouter.get('/:username', getFunction);

export default helloRouter;
