import { NgModule } from '@angular/core';

import { ErrorsShellRoutingModule } from './errors-shell-routing.module';
import { Error404Component } from './error404/error404.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    Error404Component,
  ],
  imports: [
    SharedModule,
    ErrorsShellRoutingModule
  ]
})
export class ErrorsShellModule {}
