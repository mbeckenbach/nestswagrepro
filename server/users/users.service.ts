import { Injectable } from '@nestjs/common';
import { UserAccount } from '../models/user-accoun';

@Injectable()
export class UsersService {

  // TODO: Use hashed passwords
  // TODO: Move to DB
  private readonly users: UserAccount[] = [
    {
      userId: 1,
      email: 'john@doe.com',
      password: 'changeme',
    },
    {
      userId: 2,
      email: 'maria@doe.com',
      password: 'guess',
    },
  ];

  /**
   * Finds a user by email
   * @param email Email
   */
  async findByEmail(email: string): Promise<UserAccount | undefined> {
    return this.users.find(user => user.email === email);
  }
}
