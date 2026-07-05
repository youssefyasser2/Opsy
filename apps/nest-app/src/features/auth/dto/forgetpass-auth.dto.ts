import { IsNotEmpty, IsString } from 'class-validator';

export class ForgetPassAuthDto {
  @IsString()
  @IsNotEmpty()
  email!: string;
}
