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

  allTests() {
    let run1: Number = this.Test1();
    let run2: Number = this.Test2();
    let run3: Number = this.Test3();


    if (this.runTest1 === 200 && this.runTest2 === 200 && this.runTest3 === 200) {
      this.alertController
        .create({
          header: 'Ningún test ha sido superado',
          buttons: ['OK']
        }).then(alertEl => {
          alertEl.present();
        });
    }
    if (this.runTest1 === 400 && this.runTest2 === 400 && this.runTest3 === 400) {
      this.alertController
        .create({
          header: 'Todos los test han sido superados con exito',
          buttons: ['OK']
        }).then(alertEl => {
          alertEl.present();
        });
    }
  }


  Test1(): any {
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
        console.log("ha entrado aqui");
        this.runTest1 = 200;
      })
      .catch(error => {
        console.log(error);
        console.log("ha entrado aqui");
        this.runTest1 = 400;
      });

  }

  Test2(): any {
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
        console.log("ha entrado aqui");
        this.runTest2 = 200;
      })
      .catch(error => {
        console.log(error);
        console.log("ha entrado aqui");
        this.runTest2 = 400;
      });
  }


  Test3(): any {
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
        console.log("ha entrado aqui");
        this.runTest3 = 200;
      })
      .catch(error => {
        console.log(error);
        console.log("ha entrado aqui");
        this.runTest3 = 400;
      });
  }

}