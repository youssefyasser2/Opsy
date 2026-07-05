import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProjectDiscoveryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  projectName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  packageManager?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  runtime?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  runtimeVersion?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  operatingSystem?: string;

  @IsOptional()
  @IsBoolean()
  docker?: boolean;

  @IsOptional()
  @IsObject()
  packageDependencies?: Record<string, string>;

  @IsOptional()
  @IsObject()
  packageDevDependencies?: Record<string, string>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sourceFileExtensions?: string[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nodeEngineVersion?: string;
}
