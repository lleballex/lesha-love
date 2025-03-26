import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'

import { UserRole } from '@/users/entities/user.entity'

@Injectable()
export class IsRecruiterGuard implements CanActivate {
  // eslint-disable-next-line @typescript-eslint/require-await
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    if (request.user?.role !== UserRole.Recruiter) {
      throw new UnauthorizedException()
    }

    return true
  }
}
