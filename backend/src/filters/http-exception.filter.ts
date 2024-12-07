import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const statusCode = exception.getStatus();
    const errorResponse = exception.getResponse();

    let error: string = 'Error';
    let message: string = 'An unexpected error occurred';

    if (typeof errorResponse === 'object' && errorResponse) {
      error = (errorResponse as any)['error'] || error;
      message = (errorResponse as any)['message'] || message;
    } else {
      message = errorResponse as string;
    }

    response.status(statusCode).send({
      error,
      statusCode,
      message: [message],
    });
  }
}
