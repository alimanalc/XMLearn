import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, PopoverController, AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { Atributo, Form } from 'src/app/app.data.model';
import { InfoStringComponent } from 'src/app/components/info-string/info-string.component';
import { InfoURLComponent } from 'src/app/components/info-url/info-url.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {
  atributo1: Atributo = { 'name': '', 'value': '', 'type': 'string' };
  atributo2: Atributo = { 'name': '', 'value': '', 'type': 'none' };
  atributo3: Atributo = { 'name': '', 'value': '', 'type': 'string' };
  form: Form = new Form();
  url: string = '';
  formBefore: Form = new Form();

  //form = [{ 'id': 0, 'name': '', 'value': '', 'type': 'string' }, { 'id': 1, 'name': '', 'value': '', 'type': 'none' }, { 'id': 2, 'name': '', 'value': '', 'type': 'string' }];

  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController, private cookieService: CookieService,
    private popoverController: PopoverController,
    public alertController: AlertController) {
    this.form.atributos = Array<Atributo>();
    this.form.atributos.push(this.atributo1);
    this.form.atributos.push(this.atributo2);
    this.form.atributos.push(this.atributo3);
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  addCampoString() {
    let atributo: Atributo = { 'name': '', 'value': '', 'type': 'string' };
    this.form.atributos.push(atributo);
    //this.form.push({ 'id': this.form.length, 'name': '', 'value': '', 'type': 'string' });
  }

  addCampo() {
    let atributo: Atributo = { 'name': '', 'value': '', 'type': 'none' };
    this.form.atributos.push(atributo);
    // this.form.push({ 'id': this.form.length, 'name': '', 'value': '', 'type': 'none' });
  }

  deleteCampo(campo) {
    let index = this.form.atributos.indexOf(campo, 0);
    if (index > -1) {
      this.form.atributos.splice(index, 1);
    }
  }

  createForm() {
    let vacio: boolean = false;
    for (let entry of this.form.atributos) {
      if ((entry.name === '') || (entry.type === 'none' && entry.value === '') || (this.url === '')) {
        vacio = true;
      }
    }
    //Si los campos estan vacios
    if (vacio) {
      this.alertController
        .create({
          header: 'Todos los campos deben estar rellenos',
          buttons: ['OK']
        }).then(alertEl => {
          alertEl.present();
        });

      //Si los campos estan llenos
    } else {
      //Si hay un formalio creado anteriormente
      if (this.cookieService.get('form')) {
        this.alertController
          .create({
            header: '¿Desea guardar la última petición que realizó además de esta?',
            buttons: [
              {
                //Si desea guardar ambas peticiones
                text: 'Guardar ambas',
                handler: () => {
                  this.formBefore = JSON.parse(this.cookieService.get('form'));
                  this.cookieService.set('formBefore', JSON.stringify(this.formBefore));
                  this.form.url = this.url;
                  this.cookieService.set('form', JSON.stringify(this.form));
                  console.log(this.cookieService.get('form'));
                  this.alertController
                    .create({
                      header: 'Los datos se han guardado correctamente',
                      buttons: ['OK']
                    }).then(alertEl => {
                      alertEl.present();
                    });
                }
              },
              {
                //Si solo desea guardar esta petición
                text: 'Solo esta',
                handler: () => {
                  this.form.url = this.url;
                  this.cookieService.set('form', JSON.stringify(this.form));
                  console.log(this.cookieService.get('form'));
                  this.cookieService.set('url', this.url);
                  this.alertController
                    .create({
                      header: 'Los datos se han guardado correctamente',
                      buttons: ['OK']
                    }).then(alertEl => {
                      alertEl.present();
                    });
                }
              }]
          }).then(alertEl => {
            alertEl.present();
          });
        // Si es la primera petición
      } else {
        this.form.url = this.url;
        this.cookieService.set('form', JSON.stringify(this.form));
        console.log(this.cookieService.get('form'));
        this.cookieService.set('url', this.url);
        this.alertController
          .create({
            header: 'Los datos se han guardado correctamente',
            buttons: ['OK']
          }).then(alertEl => {
            alertEl.present();
          });
      }
    }
  }



  async mostrarInfoString(ev: any) {
    const popover = await this.popoverController.create({
      component: InfoStringComponent,
      event: ev,
      showBackdrop: true,
    });
    return await popover.present();
  }

  async mostrarInfoURL(ev: any) {
    const popover = await this.popoverController.create({
      component: InfoURLComponent,
      event: ev,
      showBackdrop: true,
    });
    return await popover.present();
  }

}
