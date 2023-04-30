import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { classToPlain } from 'class-transformer';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    new Reflector();
    const url = context.switchToHttp().getRequest().url;
    const plainResponse = this.reflector.get<boolean>('plainResponse', context.getHandler());

    return next.handle().pipe(
      tap((data) => {
        // this.loggerService.log(`[${url}] response: ` + JSON.stringify(data));
      }),
      map((data) => {
        if (plainResponse === true) return classToPlain(data);
        else
          return {
            statusCode: 200,
            data: classToPlain(data) // Serialize
          };
      })
    );
  }
}
