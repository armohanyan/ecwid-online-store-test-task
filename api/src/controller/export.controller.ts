import { Request, Response, NextFunction } from 'express';
import { ExportService } from '../services';

export default class ExportController {
  static async exportCSV(req: Request, res: Response, next: NextFunction) {
    try {
      const idsParam = req.query.ids as string;
      const selectedIds = idsParam.split(',').map((id) => parseInt(id));

      await ExportService.exportCSV(selectedIds, res);
    } catch (error) {
      next(error);
    }
  }

  static async exportXLSX(req: Request, res: Response, next: NextFunction) {
    try {
      const idsParam = req.query.ids as string;
      const selectedIds = idsParam.split(',').map((id) => parseInt(id));

      await ExportService.exportXLSX(selectedIds, res);
    } catch (error) {
      next(error);
    }
  }
}
