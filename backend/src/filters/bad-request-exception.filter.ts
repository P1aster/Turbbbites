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
    let message: string = 'Bad Request';

    if (typeof exceptionResponse === 'object' && exceptionResponse) {
      error = exceptionResponse['error'] || error;
      message = exceptionResponse['message'].toString() || message;
    } else if (typeof exceptionResponse === 'string') {
      error = exceptionResponse;
    }

    response.status(statusCode).json({
      error: error,
      statusCode: statusCode,
      message: message,
    });
  }
}
