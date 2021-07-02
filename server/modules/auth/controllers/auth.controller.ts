import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtRefreshAuthGuard } from '../guards/jwt-refresh.guard';
import { AllowAnonymous } from '../decorators/allow-anonymous.decorator';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Response } from 'express';
import { TokensModel } from '../models/tokens.model';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  /**
   * Authenticates the user and returns access & refresh token
   * Body: { username: '', password: '' }
   * @param req Request
   * @param res Response
   */
  @AllowAnonymous()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response): Promise<TokensModel> {

    // Generate access tokens
    const tokens = await this.authService.login({ userId: req.user.id, username: req.user.username });

    // Send tokens as cookies for local SSR website
    this.setJwtCookies(res, tokens);

    // Return tokens for native apps
    return tokens;
  }


  /**
   * Validates refresh token and creates new access and request token
   * Body: { accessToken: '', refreshToken: '' }
   * @param req Request
   * @param res Response
   */
  @AllowAnonymous()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh-token')
  async refreshToken(@Request() req, @Res({ passthrough: true }) res: Response): Promise<TokensModel> {

    // Generate access tokens
    const tokens = await this.authService.login(req.user);

    // Send tokens as cookies for local SSR website
    this.setJwtCookies(res, tokens);

    // Return tokens for native apps
    return tokens;
  }

  // noinspection JSMethodCanBeStatic
  private setJwtCookies(res: Response, tokens: TokensModel): void {
    res.cookie('jwt', tokens.accessToken, {
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure: true
    });

    res.cookie('jwt-refresh', tokens.refreshToken, {
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure: true
    });
  }

}
