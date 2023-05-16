import { Response } from 'express';

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

import { IErrorResponse, IExceptionResponse, constants } from '@monorepo-ts/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
    const context: HttpArgumentsHost = host.switchToHttp();
    const response: Response = context.getResponse<Response>();

    const httpStatus: number =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const defaultResponce: string | IExceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : '';
    const message = defaultResponce ? this.fetchErrorMessage(defaultResponce) : constants.DEFAULT_ERROR_MESSAGE;

    const result: IErrorResponse = {
      code: httpStatus,
      message: message
    };

    Logger.error(exception);
    response.status(httpStatus).json(result);
  }

  fetchErrorMessage(defaultResponce: string | IExceptionResponse) {
    let message = '';
    if (typeof defaultResponce === 'object') {
      message = defaultResponce.statusCode && defaultResponce.statusCode == 404 ? constants.NOT_FOUND : '';

      if (!message && defaultResponce.message) {
        if (Array.isArray(defaultResponce.message)) {
          message = defaultResponce.message[0];
        } else {
          message = defaultResponce.message;
        }
      }

      if (!message && defaultResponce.error) {
        message = defaultResponce.error;
      }
    } else {
      message = defaultResponce;
    }
    return message;
  }
}
