import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController,
    private translate: TranslateService,
    private cookieService: CookieService) {
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  //Método para pasar de página
  nextPage() {
    this.navCtrl.navigateRoot('/user');
  }

  //Cambiar el idioma
  changeLanguage(selectedValue: { detail: { value: string } }) {
    this.cookieService.set('lang', selectedValue.detail.value);
    this.translate.use(selectedValue.detail.value);
  }
}
