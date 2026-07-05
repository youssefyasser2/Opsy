import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { Public } from '../../common/Decorators/public.decorator';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ForgetPassAuthDto } from './dto/forgetpass-auth.dto';
import { User } from '../users/entities/user.entity';

type AuthenticatedRequest = Request & {
  user: Omit<User, 'password'>;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginAuthDto) {
    return this.authService.signIn(dto);
  }

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: RegisterAuthDto) {
    return this.authService.register(dto);
  }

  @Post('forgetpass')
  @Public()
  @HttpCode(HttpStatus.OK)
  forgetPass(@Body() dto: ForgetPassAuthDto) {
    return this.authService.forgetPass(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() request: AuthenticatedRequest) {
    return this.authService.logout(request.user.id);
  }
}
