import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteLanguage } from './i18n/i18n.utils';

/**
 * Global routes
 */
const routes: Routes = [
  // Routes to language modules
  // Each language has it's own wrapper module to load translations and set locales
  { path: WebsiteLanguage.English, loadChildren: () => import('./i18n/en.module').then(m => m.SiteEnModule) },
  { path: WebsiteLanguage.German, loadChildren: () => import('./i18n/de.module').then(m => m.SiteDeModule) },
];

/**
 * AppRoutingModule
 */
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled' // Needed for SSR to work
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
