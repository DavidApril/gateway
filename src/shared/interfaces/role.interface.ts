import { ValidRoles } from './valid-roles';

export interface Role {
  id: number;
  name: ValidRoles;
  description: string;
}
