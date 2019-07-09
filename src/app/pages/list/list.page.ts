import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { DataManagement } from 'src/app/services/dataManagement';
import { ListForm, Form } from 'src/app/app.data.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  forms: ListForm;
  name: string;
  hayForms: boolean = false;
  constructor(public menuCtrl: MenuController,
    private cookieService: CookieService,
    public dM: DataManagement,
    public navCtrl: NavController,
    public alertController: AlertController) {
    if (this.cookieService.get('forms')) {
      this.forms = JSON.parse(this.cookieService.get('forms'));
      this.hayForms = true;
    }

    this.name = this.cookieService.get('formUse');
  }

  ngOnInit() {
  }


  changeForm(form: Form) {
    this.cookieService.set('form', JSON.stringify(form));
    this.cookieService.set('formUse', form.nameForm);
    this.name = form.nameForm;
  }

}
