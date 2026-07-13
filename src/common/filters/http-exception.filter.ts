import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const message =
      exception instanceof HttpException
        ? typeof responseBody === 'string'
          ? responseBody
          : (responseBody as any).message || 'Internal server error'
        : 'Internal server error';

    const errors =
      exception instanceof HttpException &&
      typeof responseBody === 'object' &&
      (responseBody as any).message instanceof Array
        ? (responseBody as any).message
        : undefined;

    const payload: any = {
      success: false,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    if (errors) {
      payload.errors = errors;
    }

    response.status(status).json(payload);
  }
}
