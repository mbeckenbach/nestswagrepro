import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { HelloModule } from './modules/hello/hello.module';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/ati-translate/browser'),
      extraProviders: [
        // Do not remove. Causes that REQUEST & RESPONSE is not injected for some strange reason
      ],
    }),
    HelloModule,
  ],
  providers: [
  ]
})
export class AppModule {}
