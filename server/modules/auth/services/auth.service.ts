import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../database/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as randtoken from 'rand-token';
import { TokensModel } from '../models/tokens.model';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
              private jwtService: JwtService) {
  }

  async validateUser(username: string, passwordHash: string): Promise<{ id: number, username: string }> {
    // TODO: Replace clear text password by hash
    return await this.usersService.validateCredentials(username, passwordHash);
  }

  async login(user: { userId: number, username: string }): Promise<TokensModel> {
    const payload = { username: user.username, sub: user.userId };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: await this.generateRefreshToken(user.userId)
    };
  }

  async generateRefreshToken(userId: number): Promise<string> {
    const refreshToken = randtoken.generate(16);
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 6);
    await this.usersService.saveOrUpdateRefreshToken(userId, refreshToken, expireDate);
    return refreshToken;
  }
}
