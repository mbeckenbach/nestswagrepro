import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { HelloModule } from './modules/hello/hello.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/ati-translate/browser'),
      extraProviders: [
        // Do not remove. Causes that REQUEST is not injected
      ]
    }),
    TypeOrmModule.forRoot({
      // See https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md#mssql-connection-options
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'Meister07',
      database: 'devtest',
      entities: [],
      extra: {
        options: {
          // TODO: Should be true at azure
          encrypt: false,
          instanceName: 'SQLEXPRESS'
        },
      },
      synchronize: true,
    }),
    HelloModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
