import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();

    return next.handle().pipe(
      map((data) => {
        const time = Date.now() - start;

        return {
          success: true,
          data,
          timestamp: new Date().toISOString(),
          executionTime: `${time}ms`,
        };
      }),
    );
  }
}