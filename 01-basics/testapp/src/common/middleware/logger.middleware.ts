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
      console.log("------------------ MIDDLEWARE -----------------------------");
      console.log(`[${req.method}] ${req.originalUrl} - ${time}ms`);
      console.log("------------------ MIDDLEWARE -----------------------------");
    });

    next();
  }
  //----------------------------------------------------
}
/*
🔹 What this middleware does
Your LoggerMiddleware is used to:
👉 Log every HTTP request along with how long it took to complete
-----------------------------------------------------------------
Step-by-step flow:
const start = Date.now();
When request comes in → store start time
res.on('finish', () => {
Listen for the "finish" event on the response
const time = Date.now() - start;
When response is completed → calculate total time taken
console.log(`[${req.method}] ${req.originalUrl} - ${time}ms`);
Log something like:
[GET] /users - 45ms
next();
Pass control to the next middleware / controller
🔥 What is "finish" here?

This is the most important part.

👉 res.on('finish') means:

"Run this function when the response has been completely sent to the client"

🔍 In simple words:
Request comes in → middleware starts timer ⏱️
Controller processes request
Response is sent back to client
✅ "finish" event fires here
📊 Lifecycle visualization
Request → Middleware → Controller → Response sent → finish event triggered
🔹 Why use finish instead of logging directly?

If you log like this ❌:

console.log("Request received");

👉 You only know when request started, NOT when it finished.

With finish ✅:

You know exact time taken
Useful for:
Performance monitoring
Debugging slow APIs
Logging
*/