import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.page.html',
  styleUrls: ['./gdpr.page.scss'],
})
export class GdprPage implements OnInit {

  constructor(public menuCtrl: MenuController,
    public cookieService: CookieService,
    public translate: TranslateService) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  //Cambiar el idioma
  changeLanguage(selectedValue: { detail: { value: string } }) {
    this.cookieService.set('lang', selectedValue.detail.value);
    this.translate.use(selectedValue.detail.value);
  }
}
