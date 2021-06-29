import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserProfile } from '../../models/user-profile';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
              private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<UserProfile> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
