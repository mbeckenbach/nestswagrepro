import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsShellRoutingModule } from './errors-shell-routing.module';
import { Error404Component } from './error404/error404.component';


@NgModule({
  declarations: [
    Error404Component,
  ],
  imports: [
    CommonModule,
    ErrorsShellRoutingModule
  ]
})
export class ErrorsShellModule {}
