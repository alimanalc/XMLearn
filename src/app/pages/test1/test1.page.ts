import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { DataManagement } from 'src/app/services/dataManagement';
import { CookieService } from 'ngx-cookie-service';
import { Form } from 'src/app/app.data.model';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.page.html',
  styleUrls: ['./test1.page.scss'],
})
export class Test1Page implements OnInit {

  constructor(public menuCtrl: MenuController,
    private cookieService: CookieService,
    public dM: DataManagement,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  runTest() {
    let test: string = "]]>";
    const fd = new FormData();
    let form: Form;
    form = JSON.parse(this.cookieService.get('form'));
    let url = form.url;
    for (let entry of form.atributos) {
      let nombre: string;
      nombre = entry.name;
      console.log(entry.name);
      if (entry.type === 'none') {
        fd.append(nombre, entry.value);
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
