import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Scope } from './entities/scope.entity'

@Injectable()
export class ScopesService {
  constructor(
    @InjectRepository(Scope)
    private readonly scopesRepo: Repository<Scope>,
  ) {}

  findAll() {
    return this.scopesRepo.find()
  }
}
