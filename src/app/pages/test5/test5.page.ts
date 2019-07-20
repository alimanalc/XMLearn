import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { DataManagement } from 'src/app/services/dataManagement';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Form } from 'src/app/app.data.model';

@Component({
  selector: 'app-test5',
  templateUrl: './test5.page.html',
  styleUrls: ['./test5.page.scss'],
})
export class Test5Page implements OnInit {

  text1: string = "</email><userid>";
  text2: string = "</userid><email>";
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
    let test: string = "a</email><userid>0 OR true</userid><email>a@b.com";
    let fd = new HttpParams();
    let form: Form;
    form = JSON.parse(this.cookieService.get('form'));
    let url = form.url;
    for (let entry of form.atributos) {
      if (entry.type === 'none') {
        fd = fd.append(entry.name, entry.value);
      } else {
        if (entry.name === 'email') {
          fd = fd.append(entry.name, test);
        } else {
          fd = fd.append(entry.name, 'xmlearn');
        }

      }
    }




    this.dM
      .runTest(url, fd)
      .then(data => {
        this.router.navigate(['/negative', 5]);
      })
      .catch(error => {
        console.log(error);
        if (error.status === 400 || error.status === 422) {
          this.navCtrl.navigateRoot('/positive');
        }
        if (error.status === 500 || error.status === 502 || error.status === 503 || error.status === 504) {
          this.alertController
            .create({
              header: 'Ha habido un error con su servidor por favor inténtelo más tarde.',
              buttons: ['OK']
            }).then(alertEl => {
              alertEl.present();
            });
        }
        if (error.status === 404) {
          this.alertController
            .create({
              header: 'Hay un fallo con la petición creada por favor creala de nuevo.',
              buttons: ['OK']
            }).then(alertEl => {
              alertEl.present();
            });
        }
        if (error.status === 429) {
          this.alertController
            .create({
              header: 'Han sido enviadas demasiadas solicitudes por favor inténtelo de nuevo más tarde.',
              buttons: ['OK']
            }).then(alertEl => {
              alertEl.present();
            });
        }
        if (error.status === 408) {
          this.alertController
            .create({
              header: 'Por motivos ajenos a nosotros se ha excedido el tiempo de espera de la respuesta por favor inténtelo de nuevo más tarde.',
              buttons: ['OK']
            }).then(alertEl => {
              alertEl.present();
            });
        }
      });
  }

}
