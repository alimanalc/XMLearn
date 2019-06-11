import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';
import { MenuController, NavController, PopoverController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { InfoStringComponent } from 'src/app/components/info-string/info-string.component';

@Component({
  selector: 'app-data2',
  templateUrl: './data2.page.html',
  styleUrls: ['./data2.page.scss'],
})
export class Data2Page implements OnInit {
  numbers: number = 3;
  form = [{ 'id': 0, 'name': '', 'value': '', 'type': 'string' }, { 'id': 1, 'name': '', 'value': '', 'type': 'none' }, { 'id': 2, 'name': '', 'value': '', 'type': 'string' }];

  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController, private cookieService: CookieService,
    private popoverController: PopoverController) {
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  addCampoString() {
    this.form.push({ 'id': this.form.length, 'name': '', 'value': '', 'type': 'string' });
    console.log(this.form);
  }

  addCampo() {
    this.form.push({ 'id': this.form.length, 'name': '', 'value': '', 'type': 'none' });
    console.log(this.form);
  }

  deleteCampo(campo) {
    let index = this.form.indexOf(campo, 0);
    if (index > -1) {
      this.form.splice(index, 1);
    }
  }

  nextPage() {
    console.log(this.form);
    let test = "";
    test = this.form.join(", ");
    console.log(test);
    this.cookieService.set('form', String(this.form));
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
