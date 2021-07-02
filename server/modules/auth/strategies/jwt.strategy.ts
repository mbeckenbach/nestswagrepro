import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { JWT_SECRET } from '../auth.constants';

/**
 * Extracts the jwt from a cookie
 * @param req Http Request
 */
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.jwt;
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(@Inject('JWT_SECRET') jwtSecret: string) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Take jwt from http header
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // Take jwt from cookie
        cookieExtractor
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { sub: number, iat: number, exp: number, username: string }): Promise<{ userId: any; username: any }> {
    return { userId: payload.sub, username: payload.username };
  }
}
