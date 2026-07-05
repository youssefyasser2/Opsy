import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { randomBytes, pbkdf2Sync } from 'crypto';
import { Role } from '../../common/enums/user-role.enum';

type SafeUser = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private toSafeUser(user: User): SafeUser {
    const { password: _password, ...safeUser } = user;

    return safeUser;
  }

  private hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString(
      'hex',
    );

    return `${salt}:${hash}`;
  }

  verifyPassword(password: string, storedPassword: string): boolean {
    const [salt, hashedPassword] = storedPassword.split(':');

    if (!salt || !hashedPassword) {
      return password === storedPassword;
    }

    const hashToCompare = pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString(
      'hex',
    );

    return hashToCompare === hashedPassword;
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create({
      ...createUserDto,
      role: Role.User,
      password: this.hashPassword(createUserDto.password),
    });

    const savedUser = await this.usersRepository.save(user);

    return this.toSafeUser(savedUser);
  }

  async findAll() {
    const users = await this.usersRepository.find();

    return users.map((user) => this.toSafeUser(user));
  }

  async findMe(id: string) {
    return this.findOne(id);
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toSafeUser(user);
  }

  async findAuthUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async findByIdentifier(identifier: string) {
    const user = await this.usersRepository.findOne({
      where: [{ email: identifier }, { name: identifier }],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toSafeUser(user);
  }

  async findAuthUserByIdentifier(identifier: string) {
    const user = await this.usersRepository.findOne({
      where: [{ email: identifier }, { name: identifier }],
    });

    return user;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toSafeUser(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const updatePayload = { ...updateUserDto };

    if (updatePayload.password) {
      updatePayload.password = this.hashPassword(updatePayload.password);
    }

    await this.usersRepository.update({ id }, updatePayload);

    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.usersRepository.delete({ id });
  }
}
