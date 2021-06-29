import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServerStateInterceptor } from './interceptors/server-state.interceptor';
import { BrowserStateInterceptor } from './interceptors/browser-state.interceptor';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { LanguageDetectionService } from './services/language-detection.service';

/**
 * Providers shared by server and browser instance
 */
const coreProviders: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: BaseUrlInterceptor,
    multi: true
  },
  LanguageDetectionService
];

/**
 * Global core module
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    HttpClientModule
  ]
})
export class CoreModule {

  /**
   * providers for server instance
   */
  static forRootServer(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...coreProviders,
        // Add universal-only providers here
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ServerStateInterceptor,
          multi: true
        }
      ],
    };
  }

  /**
   * providers for browser instance
   */
  static forRootBrowser(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...coreProviders,
        // Add browser-only providers here
        {
          provide: HTTP_INTERCEPTORS,
          useClass: BrowserStateInterceptor,
          multi: true
        },
      ],
    };
  }
}
