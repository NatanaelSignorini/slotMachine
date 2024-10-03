import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const time: number = Date.now() - now;
        if (time > 500)
          Logger.warn(
            `SPENDING: ${time}ms`,
            context.getArgs()[2]?.req?.body?.query,
          );
      }),
    );
  }
}
