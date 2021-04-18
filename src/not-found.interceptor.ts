import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  constructor(
    private errorMessage: string
  ) { }

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(tap(data => {
        console.log(data);
        
        if (data === undefined) {
          throw new NotFoundException(this.errorMessage);
        }
      }));
  }
}
