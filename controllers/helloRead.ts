import { Request, Response } from 'express';
import { Hello } from '../model/hello';
import { daysUntil } from '../utils/all';

export const getFunction = async (req: Request, res: Response) => {
  const username = req.params.username;

  // check only letters
  if (!/^[a-zA-Z]+$/.test(username)) {
    return res.status(400).json({ message: 'username should contains only letters' });
  }

  const helloObj = await Hello.findOne({ username: username });
  // check username exists
  if (!helloObj) {
    return res.status(404).json({ message: `user ${username} doesn't exists` });
  }

  const nbdays = daysUntil(helloObj.dateOfBirth);
  // Happy Birthday!
  if (nbdays == 0) {
    return res.status(200).json({ message: `Hello, ${username}! Happy birthday!` });
  }

  // Birthday in N days
  return res
    .status(200)
    .json({ message: `Hello, ${username}! Your birthday is in ${nbdays} day(s)` });
};
