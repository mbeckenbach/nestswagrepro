import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TRANSLATION, Translation } from '../../i18n/i18n.utils';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(private http: HttpClient,
              @Inject(TRANSLATION) public readonly lang: Translation) { }

  ngOnInit(): void {
  }

  testApi(): void {
    this.http.get<string>('/api/hello').subscribe((res) => console.warn(res));
  }
}
