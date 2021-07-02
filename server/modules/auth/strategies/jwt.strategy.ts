import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

// TODO: Check https://github.com/codebarista/passport-jwt-cookiecombo for SSR

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
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Take jwt from http header
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // Take jwt from cookie
        cookieExtractor
      ]),
      ignoreExpiration: false,
      // TODO: Map to value configured in auth-module
      secretOrKey: 'My Secret Never let outsiders',
    });
  }

  async validate(payload: { sub: number, iat: number, exp: number, username: string }): Promise<{ userId: any; username: any }> {
    return { userId: payload.sub, username: payload.username };
  }
}
