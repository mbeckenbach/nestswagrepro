import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { HelloModule } from './modules/hello/hello.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONNECTION_OPTIONS } from './database/database.connection';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/ati-translate/browser'),
      extraProviders: [
        // Do not remove. Causes that REQUEST is not injected
      ],
    }),
    TypeOrmModule.forRoot(DB_CONNECTION_OPTIONS),
    DatabaseModule,
    HelloModule,
    AuthModule,
  ],
  providers: [
    {
      // Enforce authentication for all api endpoints
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ]
})
export class AppModule {}
