import { LOCALE_ID, NgModule } from '@angular/core';

import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { en } from './en.translation';
import { TRANSLATION } from './i18n.utils';
import { FeaturesShellModule } from '../features/features-shell.module';

registerLocaleData(localeEn);

/**
 * Should hold only internationalisation related stuff like translations
 *
 * Another good examples of what should be here are locales for MomentJS, Timezones
 *
 * The features shell module should be imported here
 */
@NgModule({
  imports: [
    FeaturesShellModule,
  ],
  providers: [
    // providing the value of english translation data
    { provide: TRANSLATION, useValue: en },
    // Provide angular locale id
    { provide: LOCALE_ID, useValue: 'en' }
  ],
})
export class SiteEnModule {}
