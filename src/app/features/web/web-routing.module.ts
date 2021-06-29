import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebShellComponent } from './web-shell.component';

/**
 * Routes of the public website
 */
const routes: Routes = [
  { path: '', component: WebShellComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule {}
