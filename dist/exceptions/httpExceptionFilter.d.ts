import { ExceptionFilter, ArgumentsHost, HttpException, LoggerService } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private loggerService;
    constructor(loggerService: LoggerService);
    catch(exception: HttpException, host: ArgumentsHost): void;
}
