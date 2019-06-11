import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';
import { MenuController, NavController, PopoverController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { InfoStringComponent } from 'src/app/components/info-string/info-string.component';
import { Form, Atributo } from 'src/app/app.data.model';
import { ConfigService } from 'src/config/configService';

@Component({
  selector: 'app-data2',
  templateUrl: './data2.page.html',
  styleUrls: ['./data2.page.scss'],
})
export class Data2Page implements OnInit {
  atributo1: Atributo = { 'id': 0, 'name': '', 'value': '', 'type': 'string' };
  atributo2: Atributo = { 'id': 1, 'name': '', 'value': '', 'type': 'none' };
  atributo3: Atributo = { 'id': 2, 'name': '', 'value': '', 'type': 'string' };
  form: Form = new Form();

  //form = [{ 'id': 0, 'name': '', 'value': '', 'type': 'string' }, { 'id': 1, 'name': '', 'value': '', 'type': 'none' }, { 'id': 2, 'name': '', 'value': '', 'type': 'string' }];

  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController, private cookieService: CookieService,
    private popoverController: PopoverController) {
    this.form.atributos = Array<Atributo>();
    this.form.atributos.push(this.atributo1);
    this.form.atributos.push(this.atributo2);
    this.form.atributos.push(this.atributo3);
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  addCampoString() {
    let atributo: Atributo = { 'id': this.form.atributos.length, 'name': '', 'value': '', 'type': 'string' };
    this.form.atributos.push(atributo);
    //this.form.push({ 'id': this.form.length, 'name': '', 'value': '', 'type': 'string' });
  }

  addCampo() {
    let atributo: Atributo = { 'id': this.form.atributos.length, 'name': '', 'value': '', 'type': 'none' };
    this.form.atributos.push(atributo);
    // this.form.push({ 'id': this.form.length, 'name': '', 'value': '', 'type': 'none' });
  }

  deleteCampo(campo) {
    let index = this.form.atributos.indexOf(campo, 0);
    if (index > -1) {
      this.form.atributos.splice(index, 1);
    }
  }

  nextPage() {
    this.cookieService.set('form', JSON.stringify(this.form));
    console.log(this.cookieService.get('form'));
    // this.navCtrl.navigateRoot('/test1');
  }

  async mostrarInfoString(ev: any) {
    const popover = await this.popoverController.create({
      component: InfoStringComponent,
      event: ev,
      showBackdrop: true,
    });
    return await popover.present();
  }



}
