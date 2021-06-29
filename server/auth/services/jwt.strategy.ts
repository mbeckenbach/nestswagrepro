import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../auth.constants';
import { UserProfile } from '../../models/user-profile';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      usernameField: 'email',
    });
  }

  async validate(payload: {
    sub: number,
    email: string
  }): Promise<UserProfile> {
    return { userId: payload.sub, email: payload.email };
  }
}
