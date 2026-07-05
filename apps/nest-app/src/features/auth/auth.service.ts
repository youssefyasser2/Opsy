import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ForgetPassAuthDto } from './dto/forgetpass-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async validateUser(identifier: string, password: string) {
    const user = await this.usersService.findAuthUserByIdentifier(identifier);

    if (!user) {
      return null;
    }

    const isPasswordValid = this.usersService.verifyPassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async signIn(dto: LoginAuthDto) {
    const user = await this.validateUser(dto.identifier, dto.password);
    const message = 'Login successful';
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.jwtService.signAsync({ sub: user.id });
    const safeUser = { ...user };
    delete (safeUser as { password?: string }).password;

    return { message, user: safeUser, token };
  }

  async register(dto: RegisterAuthDto) {
    const { username, email, password, confirmPassword } = dto;

    const existingUser = await this.usersService.findAuthUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const user = await this.usersService.create({
      name: username,
      email,
      password,
    });

    const message = 'Registration successful';

    return { message, user };
  }

  async forgetPass(dto: ForgetPassAuthDto) {
    const { email } = dto;

    const user = await this.usersService.findAuthUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset',
      text: `Your OTP is: ${otp}`,
    });

    return {
      message: 'Password reset instructions sent to your email',
    };
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async logout(userId: string) {
    const message = 'User logged out successfully';
    return { message, userId };
  }
}
