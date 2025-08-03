import fs from 'fs';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import multer, { StorageEngine } from 'multer';

const UPLOAD_DIR = path.join(process.cwd(), 'upload');
const IMAGES_DIR = path.join(UPLOAD_DIR, 'images');

const ensureDirExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDirExists(IMAGES_DIR);

const storage: StorageEngine = multer.diskStorage({
  destination: (
    _,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) => {
    let uploadPath = '';

    if (file.mimetype.includes('image')) {
      uploadPath = IMAGES_DIR;
    } else {
      uploadPath = UPLOAD_DIR;
    }

    cb(null, uploadPath);
  },
  filename: (
    _,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp + original extension
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  const fileTypes = /jpeg|jpg|png|gif|mp4|avi|mkv/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    // @ts-ignore
    cb(new Error('Invalid file type'));
  }
};

const upload = multer({
  storage: storage,
  // @ts-expect-error
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 50 },
}).single('file');

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    let imagePath: string | null = null;

    if (req.file) {
      const relativePath = path.relative(process.cwd(), req.file.path);
      if (req.file.mimetype.startsWith('image/')) {
        imagePath = relativePath;
      }
    }

    req.body.imagePath = imagePath;

    next();
  });
};

export default uploadMiddleware;
