import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteLanguage } from './i18n/i18n.utils';

const routes: Routes = [
  // Routes to language modules
  { path: WebsiteLanguage.English, loadChildren: () => import('./i18n/en.module').then(m => m.SiteEnModule) },
  { path: WebsiteLanguage.German, loadChildren: () => import('./i18n/de.module').then(m => m.SiteDeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
