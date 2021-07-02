import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // TODO: Map to value configured in auth-module
      secretOrKey: 'My Secret Never let outsiders',
    });
  }

  async validate(payload: { sub: number, iat: number, exp: number, username: string }): Promise<{ userId: any; username: any }> {
    console.warn(payload);
    const result = { userId: payload.sub, username: payload.username };
    console.warn('result', result);
    return result;
  }
}
