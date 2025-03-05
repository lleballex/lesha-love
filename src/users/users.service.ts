import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepo.save(createUserDto)
  }

  findAll() {
    return this.usersRepo.find({
      order: {
        updatedAt: 'DESC',
      },
    })
  }

  findOne(id: string) {
    return this.usersRepo.findOneByOrFail({ id })
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.usersRepo.preload({ id, ...dto })

    if (!user) {
      throw new EntityNotFoundError(User, id)
    }

    return this.usersRepo.save(user)
  }

  async delete(id: string) {
    const user = await this.findOne(id)
    await this.usersRepo.remove(user)
    return user
  }
}
