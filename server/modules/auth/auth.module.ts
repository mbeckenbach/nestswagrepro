import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './services/auth.service';
import { DatabaseModule } from '../../database/database.module';
import { JwtRefreshTokenStrategy } from './strategies/jwt.refresh-token.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { Module } from '@nestjs/common';
import { JWT_EXPIRES_IN, JWT_SECRET } from './auth.constants';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRES_IN
      }
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    {
      provide: 'JWT_SECRET',
      useValue: JWT_SECRET
    }
  ],
  controllers: [AuthController]
})

export class AuthModule {}
