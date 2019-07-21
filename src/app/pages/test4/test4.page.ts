import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { DataManagement } from 'src/app/services/dataManagement';
import { HttpParams } from '@angular/common/http';
import { Form } from 'src/app/app.data.model';
import { Router } from '@angular/router';

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
    private router: Router) { }

  ngOnInit() {
    if (this.cookieService.get('form')) {
      this.hayForm = true;
    }
  }



  runTest() {
    let test: string = "blah' or 1=1 or 'a'='a";
    let fd = new HttpParams();
    let form: Form;
    form = JSON.parse(this.cookieService.get('form'));
    let url = form.url;
    for (let entry of form.atributos) {
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
        this.router.navigate(['/negative', 1, status]);
      })
      .catch(error => {
        console.log(error);
        if (error.status === 400 || error.status === 422) {
          this.router.navigate(['/positive', error.status]);
        }
        if (error.status === 500 || error.status === 502 || error.status === 503 || error.status === 504) {
          this.alertController
            .create({
              header: 'Ha habido un error con su servidor por favor inténtelo más tarde.',
              subHeader: 'Estado devuelto:',
              message: error.status,
              buttons: ['OK']
            }).then(alertEl => {
              alertEl.present();
            });
        }
        if (error.status === 404) {
          this.alertController
            .create({
              header: 'Hay un fallo con la petición creada por favor creala de nuevo.',
              subHeader: 'Estado devuelto:',
              message: error.status,
              buttons: ['OK']
            }).then(alertEl => {
              alertEl.present();
            });
        }
        if (error.status === 429) {
          this.alertController
            .create({
              header: 'Han sido enviadas demasiadas solicitudes por favor inténtelo de nuevo más tarde.',
              subHeader: 'Estado devuelto:',
              message: error.status,
              buttons: ['OK']
            }).then(alertEl => {
              alertEl.present();
            });
        }
        if (error.status === 408) {
          this.alertController
            .create({
              header: 'Por motivos ajenos a nosotros se ha excedido el tiempo de espera de la respuesta por favor inténtelo de nuevo más tarde.',
              subHeader: 'Estado devuelto:',
              message: error.status,
              buttons: ['OK']
            }).then(alertEl => {
              alertEl.present();
            });
        }
      });
  }

}
