import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let error: string = 'Error';

    if (typeof exceptionResponse === 'object' && exceptionResponse) {
      error = (exceptionResponse as any)['error'] || error;
    }

    const validationErrors = Array.isArray(exceptionResponse['message'])
      ? exceptionResponse['message']
      : [exceptionResponse['message']];

    response.status(statusCode).json({
      error,
      statusCode,
      message: validationErrors,
    });
  }
}
