import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { DataManagement } from 'src/app/services/dataManagement';
import { Request } from 'src/app/app.data.model';

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
    public navCtrl: NavController,
    public alertController: AlertController) {

    this.name = this.cookieService.get('formUse');
  }

  ngOnInit() {
    this.getRequests();
  }


  changeForm(request: Request) {
    this.cookieService.set('form', JSON.stringify(request));
    this.cookieService.set('formUse', request.name);
    this.name = request.name;
  }


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

}
