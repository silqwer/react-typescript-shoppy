import { type User } from 'firebase/auth';

export interface ShoppyUser extends User {
  isAdmin: boolean;
}
