import { Component, Inject } from '@angular/core';
import { TRANSLATION, Translation } from '../../../i18n/i18n.utils';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component {

  /**
   * Current page translations
   */
  lang = this.translation.features.errors.error404;

  /**
   * Constructor
   * @param translation Global translation file
   */
  constructor(@Inject(TRANSLATION) private readonly translation: Translation) { }

}
