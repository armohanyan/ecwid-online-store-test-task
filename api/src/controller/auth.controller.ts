import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services';
import { SuccessHandlerUtil } from '../utils';

export default class AuthController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.signUp(req.body);

      SuccessHandlerUtil.handleAdd(res, next, response);
    } catch (error) {
      next(error);
    }
  }

  static async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.signIn(req.body);

      SuccessHandlerUtil.handleGet(res, next, response);
    } catch (error) {
      next(error);
    }
  }
}
