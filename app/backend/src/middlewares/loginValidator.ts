import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi = require('joi');
import ErrorHandler from '../utils/ErrorHandler';

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default (req: Request, _res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) throw new ErrorHandler(StatusCodes.BAD_REQUEST, 'All fields must be filled');

  return next();
};
