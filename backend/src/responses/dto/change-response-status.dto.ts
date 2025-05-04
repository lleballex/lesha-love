import { IsNotEmpty, IsString } from 'class-validator'

export class ChangeResponseStatusDto {
  @IsString()
  @IsNotEmpty()
  message: string
}
