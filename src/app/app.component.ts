import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataManagement } from './services/dataManagement';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
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

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public dM: DataManagement
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
