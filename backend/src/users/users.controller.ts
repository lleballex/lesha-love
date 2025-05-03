import {
  Controller,
  // Get,
  // Body,
  // Patch,
  // Param,
  // Delete,
  // HttpStatus,
  // HttpCode,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  // ApiOperation
} from '@nestjs/swagger'

import { UsersService } from './users.service'
// import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // @ApiOperation({
  //   summary: 'Get all users',
  // })
  // findAll() {
  //   return this.usersService.findAll()
  // }

  // @Get(':id')
  // @ApiOperation({
  //   summary: 'Get user by id',
  // })
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(id)
  // }

  // @Patch(':id')
  // @ApiOperation({
  //   summary: 'Update user by id',
  // })
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(id, updateUserDto)
  // }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @ApiOperation({
  //   summary: 'Delete user by id',
  // })
  // async delete(@Param('id') id: string) {
  //   await this.usersService.delete(id)
  // }
}
