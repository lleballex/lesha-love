import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exceptions')

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response: Response = ctx.getResponse()
    const request: Request = ctx.getRequest()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : (exception as any).message || 'Unexpected error'

    this.logger.error(
      `${request.method} ${request.url} ${status} - ${JSON.stringify(message, null, 2)}`,
      (exception as any).stack,
    )

    if (exception instanceof HttpException) {
      response.status(status).json(message)
    } else {
      response.status(status).json({
        statusCode: status,
        message,
      })
    }
  }
}
