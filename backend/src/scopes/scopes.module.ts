import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Scope } from './entities/scope.entity'
import { ScopesController } from './scopes.controller'
import { ScopesService } from './scopes.service'

@Module({
  imports: [TypeOrmModule.forFeature([Scope])],
  controllers: [ScopesController],
  providers: [ScopesService],
})
export class ScopesModule {}
