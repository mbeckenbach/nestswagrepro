import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtRefreshAuthGuard } from '../guards/jwt-refresh.guard';
import { AllowAnonymous } from '../decorators/allow-anonymous.decorator';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  // /**
  //  * Authenticates the user and returns access & refresh token
  //  * @param model LoginModel
  //  */
  // @AllowAnonymous()
  // @Post('login')
  // async login(@Body() model: LoginModel): Promise<any> {
  //   const user = await this.authService.validateUser(model.username, model.password);
  //   if (user) {
  //     return await this.authService.login({ userId: user.id, username: user.username });
  //   } else {
  //     throw new UnauthorizedException();
  //   }
  // }

  /**
   * Authenticates the user and returns access & refresh token
   * Body: { username: '', password: '' }
   * @param req Request
   */
  @AllowAnonymous()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.login({ userId: req.user.id, username: req.user.username });
  }

  /**
   * Validates refresh token and creates new access and request token
   * Body: { accessToken: '', refreshToken: '' }
   * @param req Request
   */
  @AllowAnonymous()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh-token')
  async refreshToken(@Request() req): Promise<{ accessToken: string; refreshToken: string }> {
    return await this.authService.login(req.user);
  }

}
