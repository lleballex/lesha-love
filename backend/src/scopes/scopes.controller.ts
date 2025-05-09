import { Controller, Get } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { ScopesService } from './scopes.service'

@Controller('scopes')
@ApiBearerAuth()
export class ScopesController {
  constructor(private readonly scopesService: ScopesService) {}

  @Get()
  findAll() {
    return this.scopesService.findAll()
  }
}
