import express from 'express';
import { ExportController } from '../controller';

const router = express.Router();

router.get('/csv', ExportController.exportCSV);
router.get('/xlsx', ExportController.exportXLSX);

export default router;
