import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.login({ userId: req.user.id, username: req.user.username });
  }

  @UseGuards(AuthGuard('jwt-refresh-token'))
  @Post('refresh-token')
  async refreshToken(@Request() req): Promise<{ accessToken: string; refreshToken: string }> {
    return await this.authService.login(req.user);
  }

}
