import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional, IsUUID } from 'class-validator'

export class FindAllResponsesDto {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  byCurCandidate?: boolean

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  byCurRecruiter?: boolean

  @IsUUID(4)
  @IsOptional()
  vacancy?: string
}
