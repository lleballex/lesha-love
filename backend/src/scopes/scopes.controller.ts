import { Controller, Get } from '@nestjs/common'

import { ScopesService } from './scopes.service'

@Controller('scopes')
export class ScopesController {
  constructor(private readonly scopesService: ScopesService) {}

  @Get()
  findAll() {
    return this.scopesService.findAll()
  }
}
