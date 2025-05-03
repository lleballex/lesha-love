import { ForbiddenException, Injectable } from '@nestjs/common'

import { ResponsesService } from '@/responses/responses.service'
import { UsersService } from '@/users/users.service'

@Injectable()
export class MeService {
  constructor(
    private readonly usersService: UsersService,
    private readonly responsesService: ResponsesService,
  ) {}

  async findMyResponses(userId: string) {
    const user = await this.usersService.findOne(userId)

    if (!user.candidate) {
      throw new ForbiddenException('User must have filled candidate profile')
    }

    return this.responsesService.findAll({
      candidate: { id: user.candidate.id },
    })
  }
}
