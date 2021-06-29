import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminShellComponent } from './admin-shell.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AdminShellComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
  ]
})
export class AdminModule {}
