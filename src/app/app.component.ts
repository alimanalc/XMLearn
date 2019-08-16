import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataManagement } from './services/dataManagement';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public dM: DataManagement,
    public cookieService: CookieService,
    public navCtrl: NavController,
    private translateService: TranslateService
  ) {
    this.appPages = [
      {
        title: 'Crear petición',
        url: '/data',
        direct: 'root',
      },
      {
        title: 'Lista de tus peticiones',
        url: '/list',
        direct: 'root',
      },
      {
        title: 'Test',
        url: '/tests',
        direct: 'root',
      },
      {
        title: 'Saber más',
        url: '/more',
        direct: 'root',
      },
      {
        title: 'Sobre nosotros',
        url: '/about',
        direct: 'root',
      },
      {
        title: 'Términos y condiciones',
        url: '/gdpr2',
        direct: 'root',
      }
    ];
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.translateService.setDefaultLang('es');
    if (this.cookieService.check('lang')) {
      let language = this.cookieService.get('lang');
      this.translateService.use(language);
    } else {
      this.translateService.use('es');
    }

  }

  logout() {
    this.cookieService.delete('user');
    this.cookieService.delete('form');
    this.cookieService.delete('formUse');
    this.navCtrl.navigateRoot('/home');
  }
}
