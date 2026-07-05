import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class AuthenticateRemoteAgentDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^[0-9a-fA-F-]{36}$/)
    agentId!: string;

    @IsString()
    @IsNotEmpty()
    sharedSecret!: string;
}
