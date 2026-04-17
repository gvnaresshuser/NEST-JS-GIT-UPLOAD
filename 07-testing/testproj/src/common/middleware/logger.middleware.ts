import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

   /*  
   use(req: Request, res: Response, next: NextFunction) {
        console.log(`[${req.method}] ${req.originalUrl}`);
        next();
    } 
    */
   //----------------------------------------------------
   
   //# 🔥 Advanced Version (Response Time ⏱️)
   //Upgrade your middleware:
   
   use(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on('finish', () => {
    const time = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} - ${time}ms`);
  });

  next();
}
//----------------------------------------------------
}