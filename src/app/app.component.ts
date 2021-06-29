import { Component } from '@angular/core';
import { LanguageDetectionService } from './core/services/language-detection.service';

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
   * @param languageDetectionService LanguageDetectionService
   */
  constructor(
    private languageDetectionService: LanguageDetectionService,
  ) {
    // Redirect to the language start page
    // noinspection JSIgnoredPromiseFromCall
    this.languageDetectionService.detectLanguage();
  }
}
