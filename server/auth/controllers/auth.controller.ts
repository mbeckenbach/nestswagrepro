import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { AllowAnonymous } from '../auth.constants';
import { JwtLoginResult } from '../models/jwt-login-result';
import { UserProfile } from '../../models/user-profile';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @AllowAnonymous()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<JwtLoginResult> {
    return this.authService.login(req.user);
  }

  @Get('me')
  getProfile(@Request() req): UserProfile {
    return req.user as UserProfile;
  }
}
