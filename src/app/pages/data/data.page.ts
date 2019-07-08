import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, PopoverController, AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { Atributo, Form, ListForm } from 'src/app/app.data.model';
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
  dosForms: boolean;
  nameForm: string = '';


  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController, private cookieService: CookieService,
    private popoverController: PopoverController,
    public alertController: AlertController) {
    this.form.atributos = Array<Atributo>();
    this.form.atributos.push(this.atributo1);
    this.form.atributos.push(this.atributo2);
    this.form.atributos.push(this.atributo3);
    this.form.nameForm = this.nameForm;
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  //Crea un campo con sin un valor
  addCampoString() {
    let atributo: Atributo = { 'name': '', 'value': '', 'type': 'string' };
    this.form.atributos.push(atributo);
  }

  //Crea un campo al que se le puede añadir un valor
  addCampo() {
    let atributo: Atributo = { 'name': '', 'value': '', 'type': 'none' };
    this.form.atributos.push(atributo);
  }

  //Elimina un campo
  deleteCampo(campo) {
    let index = this.form.atributos.indexOf(campo, 0);
    if (index > -1) {
      this.form.atributos.splice(index, 1);
    }
  }

  //Crea una nueva petición
  createForm() {
    let vacio: boolean = false;
    for (let entry of this.form.atributos) {
      if ((entry.name === '') || (entry.type === 'none' && entry.value === '') || (this.url === '') || (this.nameForm === '')) {
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
      this.form.url = this.url;
      this.form.nameForm = this.nameForm;
      let forms: ListForm = new ListForm();
      forms.forms = Array<Form>();
      if (this.cookieService.get('forms')) {
        forms = JSON.parse(this.cookieService.get('forms'));
        forms.forms.push(this.form);
        this.cookieService.set('forms', JSON.stringify(forms));
        this.cookieService.set('formUse', this.form.nameForm);
      } else {
        forms.forms.push(this.form);
        this.cookieService.set('forms', JSON.stringify(forms));
        this.cookieService.set('formUse', this.form.nameForm);
      }
      console.log(forms);
      this.cookieService.set(this.nameForm, JSON.stringify(this.form));
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
  }



  //Muestra la información para los campos
  async mostrarInfoString(ev: any) {
    const popover = await this.popoverController.create({
      component: InfoStringComponent,
      event: ev,
      showBackdrop: true,
    });
    return await popover.present();
  }

  //Muestra la información para la url
  async mostrarInfoURL(ev: any) {
    const popover = await this.popoverController.create({
      component: InfoURLComponent,
      event: ev,
      showBackdrop: true,
    });
    return await popover.present();
  }


}
