import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { HttpParams } from '@angular/common/http';
import { Form } from 'src/app/app.data.model';
import { CookieService } from 'ngx-cookie-service';
import { DataManagement } from 'src/app/services/dataManagement';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.page.html',
  styleUrls: ['./tests.page.scss'],
})
export class TestsPage implements OnInit {
  runTest1: Number;
  runTest2: Number;
  runTest3: Number;
  fallo: Number;
  hayForm: boolean = false;
  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController,
    public cookieService: CookieService,
    public dM: DataManagement,
    public alertController: AlertController) {

  }

  ngOnInit() {
    if (this.cookieService.get('form')) {
      this.hayForm = true;
    }

  }

  test1() {
    this.navCtrl.navigateRoot('/test1');
  }

  test2() {
    this.navCtrl.navigateRoot('/test2');
  }

  test3() {
    this.navCtrl.navigateRoot('/test3');
  }

  test4() {
    this.navCtrl.navigateRoot('/test4');
  }

  test5() {
    this.navCtrl.navigateRoot('/test5');
  }

  test6() {
    this.navCtrl.navigateRoot('/test6');
  }

  allTests() {
    let pro1 = this.Test1();
    let pro2 = this.Test2();
    let pro3 = this.Test3();

    Promise.all([pro1, pro2, pro3]).then(() => {
      console.log("testall then");
      if (this.runTest1 === 400 && this.runTest2 === 400 && this.runTest3 === 400) {
        this.alertController
          .create({
            header: 'Todos los test han sido superados con exito',
            buttons: ['OK']
          }).then(alertEl => {
            alertEl.present();
          });
      }

      if (this.runTest1 === 404) {
        this.alertController.create({
          header: 'Hay un fallo con la petición creada por favor creala de nuevo.',
          buttons: ['OK']
        }).then(alertEl => {
          alertEl.present();
        });
      }
      if (this.runTest1 === 500 || this.runTest1 === 502 || this.runTest1 === 503 || this.runTest1 === 504) {
        this.alertController.create({
          header: 'Ha habido un error con su servidor por favor inténtelo más tarde.',
          buttons: ['OK']
        }).then(alertEl => {
          alertEl.present();
        });
      }
      if (this.runTest1 === 429) {
        this.alertController.create({
          header: 'Han sido enviadas demasiadas solicitudes por favor inténtelo de nuevo más tarde.',
          buttons: ['OK']
        }).then(alertEl => {
          alertEl.present();
        });
      }
      if (this.runTest1 === 408) {
        this.alertController.create({
          header: 'Por motivos ajenos a nosotros se ha excedido el tiempo de espera de la respuesta por favor inténtelo de nuevo más tarde.',
          buttons: ['OK']
        }).then(alertEl => {
          alertEl.present();
        });
      }
    }).catch((data) => {
      console.log("testall catch");

      this.alertController.create({
        header: 'El test ' + this.fallo + ' ha fallado.',
        buttons: ['OK']
      }).then(alertEl => {
        alertEl.present();
      });


    });
  }


  Test1(): Promise<any> {
    let test: string = "]]>";
    let fd = new HttpParams();
    let form: Form;
    form = JSON.parse(this.cookieService.get('form'));
    let url = form.url;
    for (let entry of form.atributos) {
      console.log(entry.name);
      if (entry.type === 'none') {
        fd = fd.append(entry.name, entry.value);
      } else {
        fd = fd.append(entry.name, test);
      }
    }


    return this.dM
      .runTest(url, fd)
      .then(data => {
        console.log("test1 then");
        this.runTest1 = 200;
        console.log(this.runTest1);
        this.fallo = 1;
        return Promise.reject();
      })
      .catch(error => {
        console.log(error);
        console.log("test1 catch");
        this.runTest1 = error.status;
        console.log(this.runTest1);
        return Promise.resolve();
      });

  }

  Test2(): Promise<any> {
    let test: string = "</test>";
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


    return this.dM
      .runTest(url, fd)
      .then(data => {
        console.log("test2 then");
        this.runTest2 = 200;
        console.log(this.runTest2);
        this.fallo = 2;
        return Promise.reject();
      })
      .catch(error => {
        console.log(error);
        console.log("test3 catch");
        this.runTest2 = error.status;
        console.log(this.runTest2);
        return Promise.resolve();
      });
  }


  Test3(): Promise<any> {
    let repeticiones = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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


    return this.dM
      .runTest(url, fd)
      .then(data => {
        console.log("test3 then");
        this.runTest3 = 200;
        console.log(this.runTest3);
        this.fallo = 3;
        return Promise.reject();
      })
      .catch(error => {
        console.log(error);
        console.log("test3 catch");
        this.runTest3 = error.status;
        console.log(this.runTest3);
        return Promise.resolve();
      });
  }

}