import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { REQUEST } from '@nestjs/ng-universal/dist/tokens';
import { Request } from 'express';
import { Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { DefaultWebsiteLanguage, WebsiteLanguage } from '../../i18n/i18n.utils';

/**
 * Detects the browser language at server side
 */
@Injectable()
export class LanguageDetectionService {

  // TODO: Language should be saved and restored once user manually changes

  /**
   * Constructor
   * @param platformId Angular platform ID
   * @param request Express Request
   * @param router Router
   */
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional() @Inject(REQUEST) private request: Request,
    private router: Router,
  ) {
  }

  /**
   * Detects the browser language and navigates into it or falls back to default
   */
  async detectLanguage(): Promise<boolean> {
    if (isPlatformServer(this.platformId)) {
      return this.detectBrowserLanguageServerSide();
    } else {
      return this.detectBrowserLanguageBrowserSide();
    }
  }

  /**
   * Detects the browser language using http request and navigates to detected or default language
   */
  private async detectBrowserLanguageServerSide(): Promise<boolean> {
    // Redirect to the language start page
    if (this.request.url === '/') {
      return this.navigateToDetectedLanguage(this.request.acceptsLanguages());
    }
  }

  /**
   * Detects the browser language and navigates to detected or default language
   */
  private async detectBrowserLanguageBrowserSide(): Promise<boolean> {
    // Redirect to the language start page
    if (window.location.pathname === '/') {
      return this.navigateToDetectedLanguage(window.navigator.languages as string[]);
    }
  }

  /**
   * Navigates to default language or browser language
   * @param acceptLanguages List of browser languages
   */
  private async navigateToDetectedLanguage(acceptLanguages: string[]): Promise<any> {

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
