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
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    let title: string = 'Error';
    let message: string = 'An unexpected error occurred';

    if (typeof errorResponse === 'object' && errorResponse) {
      title = (errorResponse as any)['title'] || title;
      message = (errorResponse as any)['message'] || message;
    } else {
      message = errorResponse as string;
    }

    response.status(status).send({
      title,
      status,
      message,
    });
  }
}
