import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './services/auth.service';
import { DatabaseModule } from '../../database/database.module';
import { JwtRefreshTokenStrategy } from './strategies/jwt.refresh-token.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      // TODO: Move out of code
      secret: 'My Secret Never let outsiders',
      signOptions: {
        expiresIn: '60m'
      }
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
  ],
  controllers: [AuthController]
})

export class AuthModule {}
