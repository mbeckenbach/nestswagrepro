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

  async validate(payload: any): Promise<{ userId: any; username: any }> {
    return { userId: payload.sub, username: payload.username };
  }
}
