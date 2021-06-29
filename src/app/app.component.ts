import { Component, HostBinding } from '@angular/core';
import { LanguageDetectionService } from './core/services/language-detection.service';
import { ThemeService } from './core/services/theme.service';

/**
 * App Shell component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /**
   * Use material fonts
   */
  @HostBinding('class.mat-app-background') appBackground = true;

  /**
   * Apply dark theme
   */
  @HostBinding('class.app-dark-theme') darkTheme = false;

  /**
   * @param languageDetectionService LanguageDetectionService
   * @param themeService ThemeService
   */
  constructor(
    private languageDetectionService: LanguageDetectionService,
    private themeService: ThemeService,
  ) {
    // Redirect to the language start page
    // noinspection JSIgnoredPromiseFromCall
    this.languageDetectionService.detectLanguage();

    // Set dark theme
    this.themeService.darkTheme$.subscribe(darkTheme => this.darkTheme = darkTheme);
  }
}
