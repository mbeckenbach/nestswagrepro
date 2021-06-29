import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { WebShellComponent } from './web-shell.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    WebShellComponent
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    MatButtonModule,
    MatToolbarModule,
  ]
})
export class WebModule {}
