import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class RegisterRemoteAgentDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[\w.-]{8,255}$/)
  fingerprint!: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  version!: string;
}
