import { LOCALE_ID, NgModule } from '@angular/core';

import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { de } from './de.translation';
import { TRANSLATION } from './i18n.utils';
import { FeaturesShellModule } from '../features/features-shell.module';

registerLocaleData(localeDe);

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
    { provide: TRANSLATION, useValue: de },
    // Provide angular locale id
    { provide: LOCALE_ID, useValue: 'de' }
  ],
})
export class SiteDeModule {}
