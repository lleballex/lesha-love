import { PartialType } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'

// TODO: add validation
export class UpdateUserDto extends PartialType(CreateUserDto) {}
