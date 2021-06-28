import { Component, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { REQUEST, RESPONSE } from '@nestjs/ng-universal/dist/tokens';
import { isPlatformServer } from '@angular/common';
import { Request, Response } from 'express';
import { Router } from '@angular/router';
import { DefaultWebsiteLanguage, WebsiteLanguage } from './i18n/i18n.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /**
   * Constructor
   * @param platformId Angular platform ID
   * @param request Express Request
   * @param response Express Response
   * @param router Angular Router
   */
  constructor(
    @Inject(PLATFORM_ID) platformId: any,
    @Optional() @Inject(REQUEST) request: Request,
    @Optional() @Inject(RESPONSE) response: Response,
    private router: Router,
  ) {
    // Redirect to the language start page
    if (isPlatformServer(platformId) && request.url === '/') {
      // noinspection JSIgnoredPromiseFromCall
      this.navigateToLanguage(request.acceptsLanguages());
    } else if (!isPlatformServer(platformId) && window.location.pathname === '/') {
      // noinspection JSIgnoredPromiseFromCall
      this.navigateToLanguage(window.navigator.languages as string[]);
    }
  }

  /**
   * Navigates to default language or browser language
   * @param acceptLanguages List of browser languages
   */
  private async navigateToLanguage(acceptLanguages: string[]): Promise<any> {

    // The supported translations
    const translations = Object.entries(WebsiteLanguage).map<string>(l => l[1]);
    // Checks if any of the browser languages is supported
    const hasAnySupportedLanguage = acceptLanguages.some(lang => translations.includes(lang));

    // Redirect to default language if no supported browser language
    if (!hasAnySupportedLanguage) {
      return await this.router.navigateByUrl(`/${DefaultWebsiteLanguage}`);
    }

    // Redirect to first supported browser language
    for (const lang of acceptLanguages) {
      if (translations.includes(lang)) {
        return await this.router.navigateByUrl(`/${lang}`);
      }
    }
  }
}
