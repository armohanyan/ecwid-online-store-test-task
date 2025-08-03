import fs from 'fs/promises';
import path from 'path';
import { getFirestore } from 'firebase-admin/firestore';
import createHttpError from 'http-errors';
import sharp from 'sharp';
import config from '../config';

interface GenerateImagesParams {
  imagePath: string;
}

interface ImagePaths {
  originalImagePath?: string;
  grayscalePath: string;
  sepiaPath: string;
  saturationPath: string;
}

interface FileSizeComparison {
  original: string;
  grayscale: string;
  sepia: string;
  saturation: string;
}

interface ImageUrls {
  grayscaleImage: string;
  sepiaImage: string;
  saturationImage: string;
  fileSizeComparison: FileSizeComparison;
}

export default class ImageGenerateService {
  static async generateImages(
    params: GenerateImagesParams,
  ): Promise<ImageUrls> {
    const { imagePath } = params;

    if (!imagePath) {
      throw createHttpError(400, 'Image path must be provided.');
    }

    const fullImagePath = path.resolve(imagePath);
    const exists = await this.isFileExist(fullImagePath);

    if (!exists) {
      throw createHttpError(404, 'Image not found.');
    }

    const outputDir = path.resolve('upload', 'images', 'filtered');
    await this.ensureDirectoryExists(outputDir);

    try {
      const imagePaths = await this.processImages(fullImagePath, outputDir);
      const fileSizes = await this.calculateFileSizes({
        ...imagePaths,
        originalImagePath: imagePath,
      });

      await this.saveImageDataToDb(imagePath, imagePaths, fileSizes);

      return this.buildImageUrls(imagePaths, fileSizes);
    } catch {
      throw createHttpError(500, 'Failed to process image');
    }
  }

  private static async isFileExist(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  private static async ensureDirectoryExists(dirPath: string): Promise<void> {
    await fs.mkdir(dirPath, { recursive: true });
  }

  private static async processImages(
    imagePath: string,
    outputDir: string,
  ): Promise<ImagePaths> {
    const grayscalePath = path.join(outputDir, 'grayscale_image.jpg');
    const sepiaPath = path.join(outputDir, 'sepia_image.jpg');
    const saturationPath = path.join(outputDir, 'saturation_image.jpg');

    await Promise.all([
      sharp(imagePath).grayscale().toFile(grayscalePath),
      sharp(imagePath).modulate({ saturation: 0.5, hue: 45 }).toFile(sepiaPath),
      sharp(imagePath).modulate({ saturation: 2 }).toFile(saturationPath),
    ]);

    return { grayscalePath, sepiaPath, saturationPath };
  }

  private static async calculateFileSizes(
    imagePaths: ImagePaths,
  ): Promise<FileSizeComparison> {
    const [originalSize, grayscaleSize, sepiaSize, saturationSize] =
      await Promise.all(
        [
          imagePaths.originalImagePath,
          imagePaths.grayscalePath,
          imagePaths.sepiaPath,
          imagePaths.saturationPath,
        ].map(async (p) => {
          if (p) {
            const stat = await fs.stat(p);
            return (stat.size / 1024).toFixed(2);
          }
        }),
      );

    return {
      original: `${originalSize} KB`,
      grayscale: `${grayscaleSize} KB`,
      sepia: `${sepiaSize} KB`,
      saturation: `${saturationSize} KB`,
    };
  }

  private static async saveImageDataToDb(
    originalImagePath: string,
    imagePaths: ImagePaths,
    fileSizes: FileSizeComparison,
  ): Promise<void> {
    const db = getFirestore();
    const docRef = db.collection('files').doc('sample');

    await docRef.set({
      originalImage: `upload/images/${path.basename(originalImagePath)}`,
      grayscaleImage: `upload/images/filtered/${path.basename(imagePaths.grayscalePath)}`,
      sepiaImage: `upload/images/filtered/${path.basename(imagePaths.sepiaPath)}`,
      saturationImage: `upload/images/filtered/${path.basename(imagePaths.saturationPath)}`,
      fileSizeComparison: fileSizes,
    });
  }

  private static buildImageUrls(
    imagePaths: ImagePaths,
    fileSizes: FileSizeComparison,
  ): ImageUrls {
    return {
      grayscaleImage: `${config.API_ORIGIN}upload/images/filtered/${path.basename(imagePaths.grayscalePath)}`,
      sepiaImage: `${config.API_ORIGIN}upload/images/filtered/${path.basename(imagePaths.sepiaPath)}`,
      saturationImage: `${config.API_ORIGIN}upload/images/filtered/${path.basename(imagePaths.saturationPath)}`,
      fileSizeComparison: fileSizes,
    };
  }
}
