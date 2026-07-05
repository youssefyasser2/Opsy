import { IsObject, IsOptional, IsString } from 'class-validator';
import { LogSourcesType } from '../enums/log-sources-type.enum';

export class CreateLogSourceDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  type!: LogSourcesType;

  @IsObject({ each: true })
  config!: Record<string, any>;
}
