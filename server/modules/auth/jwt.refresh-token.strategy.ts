import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('accessToken'),
      ignoreExpiration: true,
      // TODO: Map to value configured in auth-module
      secretOrKey: 'My Secret Never let outsiders',
      passReqToCallback: true
    });
  }

  async validate(req: { body: { refreshToken: string } },
                 payload: { sub: number, iat: number, exp: number, username: string }): Promise<{ userId: any; username: any }> {

    const refreshTokenInfo = await this.userService.findByRefreshToken(payload.sub, req.body.refreshToken);

    if (!refreshTokenInfo) {
      throw new UnauthorizedException();
    }

    if (new Date() > new Date(refreshTokenInfo.refreshTokenExpires)) {
      throw new UnauthorizedException();
    }

    return { userId: payload.sub, username: payload.username };
  }
}
