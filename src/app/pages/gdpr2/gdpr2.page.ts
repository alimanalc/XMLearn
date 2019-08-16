import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-gdpr2',
  templateUrl: './gdpr2.page.html',
  styleUrls: ['./gdpr2.page.scss'],
})
export class Gdpr2Page implements OnInit {

  constructor(public cookieService: CookieService,
    public translate: TranslateService) { }

  ngOnInit() {
  }

  //Cambiar el idioma
  changeLanguage(selectedValue: { detail: { value: string } }) {
    this.cookieService.set('lang', selectedValue.detail.value);
    this.translate.use(selectedValue.detail.value);
  }

}
