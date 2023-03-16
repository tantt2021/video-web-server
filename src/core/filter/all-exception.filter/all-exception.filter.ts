import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'service error' : 'client error'}`;
    const errorResponse = {
      statusCode: status,
      data: { error: message },
      message: '请求失败',
      code: '404',
    };
    response.status(status);
    response.header("Content-Type", 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
