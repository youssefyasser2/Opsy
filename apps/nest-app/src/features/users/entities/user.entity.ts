import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../../../common/enums/user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    default: Role.User,
  })
  role!: Role;

  @Column()
  name!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  password!: string;
}
