import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { environment } from '../../../environments/environment';
import { map, switchMap } from 'rxjs/operators';

/**
 * Controls the dark theme mode
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  // TODO: Theme settings should be saved and restore once user manually changes

  /**
   * Internal hold to use dark theme or not
   */
  private useDarkTheme$ = new BehaviorSubject<boolean>(environment.theming.isDarkThemeDefault);

  /*
   * If the browser / OS dark mode should be applied
   */
  private useBrowserPreference$ = new BehaviorSubject<boolean>(environment.theming.useBrowserPreference);

  /**
   * apply dark theme or not
   */
  darkTheme$ = combineLatest([
    this.useBrowserPreference$,
    this.useDarkTheme$
  ])
    .pipe(
      switchMap(([useBrowserPreference, useDarkTheme]) => {
        if (useBrowserPreference) {
          // If enabled (browser only) dark mode will enable based on OS setting
          return this.breakpointObserver.observe('(prefers-color-scheme: dark)')
                     .pipe(
                       map(result => result.matches)
                     );
        } else {
          // Just use the configured theme
          return of(useDarkTheme);
        }
      })
    );

  /**
   * constructor
   * @param breakpointObserver BreakpointObserver
   */
  constructor(private breakpointObserver: BreakpointObserver) {
  }

  /**
   * Method to set dark theme
   * Disables also watching the browser / OS setting
   * @param use Use it or not
   */
  setDarkTheme(use: boolean): void {
    this.useDarkTheme$.next(use);
    this.useBrowserPreference$.next(false);
  }

  /**
   * Setter to use the OS dark theme setting or not
   * @param use Use it or not
   */
  setUseBrowserPreference(use: boolean): void {
    this.useBrowserPreference$.next(use);
  }
}
