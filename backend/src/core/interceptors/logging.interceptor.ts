import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest()
    const now = Date.now()

    return next.handle().pipe(
      tap(() => {
        const delay = Date.now() - now
        const userInfo = req.user
          ? `${req.user.role} ${req.user.id}`
          : 'anonymous'

        this.logger.log(`${req.method} ${req.url} (${userInfo}) - ${delay}ms`)
      }),
    )
  }
}
