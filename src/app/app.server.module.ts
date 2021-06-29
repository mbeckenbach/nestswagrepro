import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

/**
 * Server side app module
 */
@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    CoreModule.forRootServer(), // Use server specific providers
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
