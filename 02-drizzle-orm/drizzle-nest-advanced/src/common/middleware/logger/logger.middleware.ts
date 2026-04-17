import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLoggerService } from '../../logger/my-logger/my-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: MyLoggerService) { }

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    res.on('finish', () => {
      const duration = Date.now() - start;

      this.logger.log(
        `${req.method} ${fullUrl} ${res.statusCode} - ${duration}ms`,
      );
    });

    next();
  }
}
//-----------------------------------------------------------------------
/* import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    console.log(`${req.method} ${fullUrl}`);

    next();
  }
} */
//------------------------------------------------------------
/* import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`${req.method} ${req.url}`);
    next();
  }
} */
