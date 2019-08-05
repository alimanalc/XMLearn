import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { DataManagement } from 'src/app/services/dataManagement';
import { CookieService } from 'ngx-cookie-service';
import { Request } from 'src/app/app.data.model';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.page.html',
  styleUrls: ['./test1.page.scss'],
})
export class Test1Page implements OnInit {
  status: string;
  hayForm: boolean = false;
  constructor(public menuCtrl: MenuController,
    private cookieService: CookieService,
    public dM: DataManagement,
    public navCtrl: NavController,
    public alertController: AlertController,
    private router: Router) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
    if (this.cookieService.get('form')) {
      this.hayForm = true;
    }
  }

  runTest() {
    let test: string = "]]>";
    let fd = new HttpParams();
    let form: Request;
    form = JSON.parse(this.cookieService.get('form'));
    let url = form.url;
    for (let entry of form.attributes) {
      console.log(entry.name);
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
        this.router.navigate(['/negative', 1, status]);
      })
      .catch(error => {
        console.log(error);


        switch (error.status) {
          case 400 || 422: {
            this.router.navigate(['/positive', error.status]);
            break;
          }
          case 500 || 502 || 503 || 504: {
            this.alertController
              .create({
                header: 'Ha habido un error con su servidor por favor inténtelo más tarde.',
                subHeader: 'Estado devuelto:',
                message: error.status,
                buttons: ['OK']
              }).then(alertEl => {
                alertEl.present();
              });
            break;
          }
          case 404: {
            this.alertController
              .create({
                header: 'Hay un fallo con la petición creada por favor creala de nuevo.',
                subHeader: 'Estado devuelto:',
                message: error.status,
                buttons: ['OK']
              }).then(alertEl => {
                alertEl.present();
              });
            break;
          }
          case 429: {
            this.alertController
              .create({
                header: 'Han sido enviadas demasiadas solicitudes por favor inténtelo de nuevo más tarde.',
                subHeader: 'Estado devuelto:',
                message: error.status,
                buttons: ['OK']
              }).then(alertEl => {
                alertEl.present();
              });
            break;
          }
          case 408: {
            this.alertController
              .create({
                header: 'Por motivos ajenos a nosotros se ha excedido el tiempo de espera de la respuesta por favor inténtelo de nuevo más tarde.',
                subHeader: 'Estado devuelto:',
                message: error.status,
                buttons: ['OK']
              }).then(alertEl => {
                alertEl.present();
              });
            break;
          }
          default: {
            this.alertController
              .create({
                header: 'Ha habido un error y no sabemos el motivo.',
                buttons: ['OK']
              }).then(alertEl => {
                alertEl.present();
              });
            break;
          }
        }
      });
  }

}
