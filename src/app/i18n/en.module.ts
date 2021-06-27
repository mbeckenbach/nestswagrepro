import { LOCALE_ID, NgModule } from '@angular/core';

import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { en } from './en.translation';
import { TRANSLATION } from './i18n.utils';
import { FeaturesModule } from '../features/features.module';

registerLocaleData(localeEn);

/**
 * Should hold only internationalisation related stuff like translations
 *
 * Another good examples of what should be here are locales for MomentJS, Timezones
 *
 * Site module should be imported here
 */
@NgModule({
  imports: [
    FeaturesModule,
  ],
  providers: [
    // providing the value of english translation data
    { provide: TRANSLATION, useValue: en },
    // Provide angular locale id
    { provide: LOCALE_ID, useValue: 'en' }
  ],
})
export class SiteEnModule {}
