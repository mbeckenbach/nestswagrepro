import { NgModule } from '@angular/core';

import { WebRoutingModule } from './web-routing.module';
import { WebShellComponent } from './web-shell.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    WebShellComponent
  ],
  imports: [
    SharedModule,
    WebRoutingModule,
  ]
})
export class WebModule {}
