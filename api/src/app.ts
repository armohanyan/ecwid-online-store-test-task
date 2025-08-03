import * as path from 'node:path';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import Api from './api';
import config from './config';
import ErrorHandlerMiddleware from './middlewares/error-handler.middleware';

interface CorsOptions {
  origin?: string;
  methods?: string[];
  allowedHeaders?: string[];
  credentials?: boolean;
  optionsSuccessStatus?: number;
  maxAge?: number;
}

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    // Uncomment the next block to disable CSP temporarily (debugging only!)
    this.app.use((req, res, next) => {
      res.removeHeader('Content-Security-Policy');
      next();
    });

    // Proper Helmet security with CSP allowing Ecwid + Cloudfront scripts
    this.app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: [
              "'self'",
              'https://app.ecwid.com',
              'https://*.cloudfront.net',
            ],
            styleSrc: ["'self'", 'https://app.ecwid.com', "'unsafe-inline'"],
            imgSrc: [
              "'self'",
              'data:',
              'https://*.ecwid.com',
              'https://*.cloudfront.net',
            ],
            connectSrc: ["'self'"],
            objectSrc: ["'none'"],
          },
        },
      }),
    );

    this.app.use(express.static(path.resolve(__dirname, '../..//client/dist')));
  }

  init() {
    this._setRequestLogger();
    this._setCors();
    this._setRequestParser();
    this._initializeApi();
    this._setErrorHandler();
  }

  private _setRequestLogger(): void {
    if (!config.DISABLE_REQUEST_LOG) {
      this.app.use(morgan('dev'));
    }
  }

  private _setCors(): void {
    const corsOptions: CorsOptions = {
      origin: process.env.CORS,
      methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
      allowedHeaders: ['Authorization', 'Content-Type', 'Origin'],
      credentials: true,
      optionsSuccessStatus: 200,
      maxAge: -1,
    };

    this.app.use(cors(corsOptions));
  }

  private _setRequestParser(): void {
    this.app.use(bodyParser.json({ limit: '1mb' }));
    const extendedOptions: bodyParser.OptionsUrlencoded = {
      limit: '500mb',
      extended: false,
    };
    this.app.use(bodyParser.urlencoded(extendedOptions));
  }

  private _initializeApi(): void {
    this.app.use('/', Api);
  }

  private _setErrorHandler(): void {
    // this.app.use(ErrorHandlerMiddleware.init);
  }
}

export default new App();
