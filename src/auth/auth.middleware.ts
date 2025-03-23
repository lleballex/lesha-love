import { Injectable, NestMiddleware } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { NextFunction, Request, Response } from 'express'

import { UserRole } from '@/users/entities/user.entity'

declare module 'express' {
  interface Request {
    user?: {
      id: string
      role: UserRole
    } | null
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req)

    if (token) {
      try {
        // TODO: check if token is valid and user exists
        const payload = await this.jwtService.verifyAsync<{
          userId: string
          userRole: UserRole
        }>(token)
        req.user = {
          id: payload.userId,
          role: payload.userRole,
        }
      } catch {
        req.user = null
      }
    } else {
      req.user = null
    }

    next()
  }

  private extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : null
  }
}
