import { Router, Request, Response } from 'express';
import { Hello } from '../model/hello';
import moment from 'moment';

const helloRouter = Router();

// SAVE OR UPDATE endpoint
helloRouter.put('/:username', async (req: Request, res: Response) => {
  const username = req.params.username;
  const today = moment(new Date()).format('YYYY-MM-DD');

  // check only letters
  if (!/^[a-zA-Z]+$/.test(username)) {
    return res.status(400).json({ message: 'username should contains only letters' });
  }

  // dateOfBirth provided in body?
  if (!req.body.hasOwnProperty('dateOfBirth')) {
    return res.status(400).json({ message: 'missing parameter dateOfBirth' });
  }

  // dateOfBirth wrong format
  if (!moment(req.body.dateOfBirth, 'YYYY-MM-DD', true).isValid()) {
    return res.status(400).json({ message: 'parameter dateOfBirth not in format YYYY-MM-DD' });
  }

  // dateOfBirth > today
  if (moment(req.body.dateOfBirth).isAfter(today)) {
    return res.status(400).json({ message: 'dateOfBirth is in the future' });
  }

  let helloObj;
  const dateOfBirth = req.body.dateOfBirth;

  try {
    helloObj = await Hello.findOne({ username: username }).exec();
    // already exist => update
    if (helloObj) {
      helloObj.dateOfBirth = dateOfBirth;
      // doesn't exist => create
    } else {
      helloObj = Hello.build({ username, dateOfBirth });
    }
    await helloObj.save();
    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500).json({ message: `an error occured: ${error}` });
  }
});

export default helloRouter;
