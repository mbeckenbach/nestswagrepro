import { Component, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { TRANSLATION, Translation } from '../../../i18n/i18n.utils';
import { RESPONSE } from '@nestjs/ng-universal/dist/tokens';
import { Response } from 'express';
import { isPlatformServer } from '@angular/common';

/**
 * 404 Error Page
 */
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
   * @param response Express response
   * @param platformId Angular Platform
   */
  constructor(
    @Inject(TRANSLATION) private readonly translation: Translation,
    @Optional() @Inject(RESPONSE) response: Response,
    @Inject(PLATFORM_ID) platformId: any,
  ) {
    // Send clean status code
    if (isPlatformServer(platformId)) {
      response.status(404);
    }
  }

}
