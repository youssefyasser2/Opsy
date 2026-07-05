import { Role } from './enums/user-role.enum';

export type CurrentUser = {
  id: string;
  role: Role;
};
