import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { HelloModule } from './modules/hello/hello.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/ati-translate/browser'),
      extraProviders: [
        // Do not remove. Causes that REQUEST is not injected
      ]
    }),
    HelloModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
