import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export default class ValidatorUtil {
  static validateSignUp(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  }

  static validateSignIn(req: Request, res: Response, next: NextFunction) {
    const signInSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = signInSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    next();
  }
}
