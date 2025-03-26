import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'

import { UserRole } from '@/users/entities/user.entity'

@Injectable()
export class IsCandidateGuard implements CanActivate {
  // eslint-disable-next-line @typescript-eslint/require-await
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    console.log(request.user)

    if (request.user?.role !== UserRole.Candidate) {
      throw new UnauthorizedException()
    }

    return true
  }
}
