import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { DataManagement } from 'src/app/services/dataManagement';
import { Request } from 'src/app/app.data.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  requests: Request[];
  name: string;
  hayForms: boolean = false;
  constructor(public menuCtrl: MenuController,
    private cookieService: CookieService,
    public dM: DataManagement,
    public translate: TranslateService) {

    this.name = this.cookieService.get('formUse');
  }

  ngOnInit() {
    this.getRequests();
  }


  //Cambiar la petición que se quiere usar
  changeForm(request: Request) {
    this.cookieService.set('form', JSON.stringify(request));
    this.cookieService.set('formUse', request.name);
    this.name = request.name;
  }


  //Conseguir de la base de datos todas las peticiones del usuario
  getRequests() {
    this.dM
      .getRequests()
      .then(data => {
        let requests: Request[];
        requests = JSON.parse(JSON.stringify(data.requests));
        if (requests.length > 0) {
          this.requests = data.requests;
          this.hayForms = true;
        }

      })
      .catch(error => {
        console.log(error);
      });
  }

  //Cambiar el idioma
  changeLanguage(selectedValue: { detail: { value: string } }) {
    this.cookieService.set('lang', selectedValue.detail.value);
    this.translate.use(selectedValue.detail.value);
  }

}
