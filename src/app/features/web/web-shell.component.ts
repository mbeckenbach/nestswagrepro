import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TRANSLATION, Translation } from '../../i18n/i18n.utils';

/**
 * Shell component for the public website
 */
@Component({
  selector: 'app-web-shell',
  templateUrl: './web-shell.component.html',
  styleUrls: ['./web-shell.component.scss']
})
export class WebShellComponent implements OnInit {

  /**
   * constructor
   * @param http HttpClient
   * @param lang Translation
   */
  constructor(private http: HttpClient,
              @Inject(TRANSLATION) public readonly lang: Translation) { }

  /**
   * NgHook
   */
  ngOnInit(): void {
    this.testApi();
  }

  /**
   * Tests the api calls
   */
  testApi(): void {
    // It's important for SSR that URLs are fully qualified
    this.http.get<string>('/api/hello').subscribe((res) => console.warn(res));
  }
}
