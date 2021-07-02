import { Injectable } from '@nestjs/common';
import { User } from './user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>
  ) {
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.userRepo.findOne(id);
  }

  async validateCredentials(username: string, passwordHash: string): Promise<{ id: number, username: string }> {
    // TODO: Replace clear text password by hash
    return await this.userRepo.findOne({ select: ['id', 'username'], where: { username, password: passwordHash } });
  }

  async findByRefreshToken(id: number, refreshToken: string): Promise<{ refreshToken: string, refreshTokenExpires: Date }> {
    return await this.userRepo.findOne({ select: ['refreshToken', 'refreshTokenExpires'], where: { id } });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepo.findOne({ username });
  }

  async saveOrUpdateRefreshToken(
    userId: number,
    refreshToken: string,
    refreshTokenExpires: Date): Promise<void> {
    await this.userRepo.update(userId, { refreshToken, refreshTokenExpires });
  }

}
