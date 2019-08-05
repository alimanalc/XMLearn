import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, PopoverController, AlertController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { Attribute, Request } from 'src/app/app.data.model';
import { InfoStringComponent } from 'src/app/components/info-string/info-string.component';
import { InfoURLComponent } from 'src/app/components/info-url/info-url.component';
import { DataManagement } from 'src/app/services/dataManagement';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {
  attribute1: Attribute = { 'name': '', 'value': '', 'type': 'string' };
  attribute2: Attribute = { 'name': '', 'value': '', 'type': 'none' };
  attribute3: Attribute = { 'name': '', 'value': '', 'type': 'string' };
  request: Request = new Request();
  url: string = '';
  dosForms: boolean;
  name: string = '';


  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController, private cookieService: CookieService,
    private popoverController: PopoverController,
    public alertController: AlertController,
    public dM: DataManagement,
    private translate: TranslateService) {
    this.request.attributes = Array<Attribute>();
    this.request.attributes.push(this.attribute1);
    this.request.attributes.push(this.attribute2);
    this.request.attributes.push(this.attribute3);
    this.request.name = this.name;
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  //Crea un campo con sin un valor
  addCampoString() {
    let attribute: Attribute = { 'name': '', 'value': '', 'type': 'string' };
    this.request.attributes.push(attribute);
  }

  //Crea un campo al que se le puede añadir un valor
  addCampo() {
    let attributes: Attribute = { 'name': '', 'value': '', 'type': 'none' };
    this.request.attributes.push(attributes);
  }

  //Elimina un campo
  deleteCampo(campo) {
    let index = this.request.attributes.indexOf(campo, 0);
    if (index > -1) {
      this.request.attributes.splice(index, 1);
    }
  }

  //Crea una nueva petición
  createForm() {
    let vacio: boolean = false;
    for (let entry of this.request.attributes) {
      if ((entry.name === '') || (entry.type === 'none' && entry.value === '') || (this.url === '') || (this.name === '')) {
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
      this.request.url = this.url;
      this.request.name = this.name;

      //Conexion con la base de datos
      this.dM
        .getRequests()
        .then(data => {
          let nombreBueno = false;


          let requests: Request[];
          requests = JSON.parse(JSON.stringify(data.requests));
          if (requests.length > 0) {
            for (let entry of requests) {
              if (this.request.name === entry.name) {
                this.alertController
                  .create({
                    header: 'Ya tienes una petición con este nombre',
                    buttons: ['OK']
                  }).then(alertEl => {
                    alertEl.present();
                  });
              } else {
                nombreBueno = true;
              }
            }
          } else {
            this.dM
              .createRequest(this.request)
              .then(data => {

                this.cookieService.set('formUse', this.request.name);
                this.cookieService.set('form', JSON.stringify(this.request));
                this.alertController
                  .create({
                    header: 'Los datos se han guardado correctamente',
                    buttons: ['OK']
                  }).then(alertEl => {
                    alertEl.present();
                  });
              })
              .catch(error => {
                console.log(error);
              });
          }

          if (nombreBueno) {
            this.dM
              .createRequest(this.request)
              .then(data => {

                this.cookieService.set('formUse', this.request.name);
                this.cookieService.set('form', JSON.stringify(this.request));
                this.alertController
                  .create({
                    header: 'Los datos se han guardado correctamente',
                    buttons: ['OK']
                  }).then(alertEl => {
                    alertEl.present();
                  });
              })
              .catch(error => {
                console.log(error);
              });
          }


        })
        .catch(error => {
          console.log(error);
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


  //Cambiar el idioma
  changeLanguage(selectedValue: { detail: { value: string } }) {
    this.cookieService.set('lang', selectedValue.detail.value);
    this.translate.use(selectedValue.detail.value);
  }


}
