import express from 'express';
import ImageGenerateController from '../controller/image-generate.controller';
import authenticate from '../middlewares/authenticate';
import uploadMiddleware from '../middlewares/upload';

const router = express.Router();

router.post(
  '/',
  authenticate,
  uploadMiddleware,
  ImageGenerateController.generateImages,
);

export default router;
