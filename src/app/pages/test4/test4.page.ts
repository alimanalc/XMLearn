import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { DataManagement } from 'src/app/services/dataManagement';
import { HttpParams } from '@angular/common/http';
import { Request } from 'src/app/app.data.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-test4',
  templateUrl: './test4.page.html',
  styleUrls: ['./test4.page.scss'],
})
export class Test4Page implements OnInit {

  hayForm: boolean = false;
  constructor(public menuCtrl: MenuController,
    private cookieService: CookieService,
    public dM: DataManagement,
    public navCtrl: NavController,
    public alertController: AlertController,
    private router: Router,
    private translate: TranslateService) { }

  ngOnInit() {
    if (this.cookieService.get('form')) {
      this.hayForm = true;
    }
  }



  //Ejecución del test
  runTest() {
    let test: string = "blah' or 1=1 or 'a'='a";
    let fd = new HttpParams();
    let form: Request;
    form = JSON.parse(this.cookieService.get('form'));
    let url = form.url;
    for (let entry of form.attributes) {
      if (entry.type === 'none') {
        fd = fd.append(entry.name, entry.value);
      } else {
        if (entry.name === 'username') {
          fd = fd.append(entry.name, test);
        } else {
          fd = fd.append(entry.name, 'blah');
        }

      }
    }




    this.dM
      .runTest(url, fd)
      .then(data => {
        let status: string = data.status;
        console.log("Status: " + status);
        this.router.navigate(['/negative', 4, status]);
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
