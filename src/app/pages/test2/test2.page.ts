import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { DataManagement } from 'src/app/services/dataManagement';
import { CookieService } from 'ngx-cookie-service';
import { Form } from 'src/app/app.data.model';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.page.html',
  styleUrls: ['./test2.page.scss'],
})
export class Test2Page implements OnInit {
  tag: string = "</test>"
  constructor(public menuCtrl: MenuController,
    private cookieService: CookieService,
    public dM: DataManagement,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  runTest() {
    let test: string = this.tag;
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
