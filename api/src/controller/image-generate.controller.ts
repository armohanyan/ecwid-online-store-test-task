import { Request, Response, NextFunction } from 'express';
import { ImageGenerateService } from '../services';
import { SuccessHandlerUtil } from '../utils';

export default class ImageGenerateController {
  static async generateImages(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ImageGenerateService.generateImages(req.body);

      SuccessHandlerUtil.handleGet(res, next, response);
    } catch (error) {
      next(error);
    }
  }
}
