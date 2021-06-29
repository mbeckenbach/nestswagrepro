import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { AllowAnonymous } from '../auth.constants';
import { JwtLoginResult } from '../models/jwt-login-result';
import { UserProfile } from '../../models/user-profile';

// TODO: Jwt implementation is super simple. Add refresh tokens, etc.
// https://javascript.plainenglish.io/nestjs-implementing-access-refresh-token-jwt-authentication-97a39e448007

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @AllowAnonymous()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  // TODO Add proper model binding & validation
  async login(@Request() req): Promise<JwtLoginResult> {
    return this.authService.login(req.user);
  }

  @Get('me')
  getProfile(@Request() req): UserProfile {
    return req.user as UserProfile;
  }
}
