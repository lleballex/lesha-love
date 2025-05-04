import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

export class FindAllResponsesDto {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  byCurCandidate?: boolean

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  byCurRecruiter?: boolean
}
