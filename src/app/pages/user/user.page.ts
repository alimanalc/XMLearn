import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, MenuController } from '@ionic/angular';
import { DataManagement } from 'src/app/services/dataManagement';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/app.data.model';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  username: string = '';
  password: string = '';
  password1: string = '';
  form: number = 0;
  constructor(
    private alertController: AlertController,
    private dM: DataManagement,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public cookieServicee: CookieService
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }




  formLogin() {
    this.form = 1;
  }

  formSignin() {
    this.form = 2;
  }


  signin() {

    let vacio: Boolean = false;
    if ((this.password === '') || (this.password1 === '') || (this.username === '')) {
      vacio = true;
    }

    if (vacio) {
      this.alertController
        .create({
          header: 'Todos los campos deben estar rellenos',
          buttons: ['OK']
        }).then(alertEl => {
          alertEl.present();
        });
    } else {
      if (this.password != this.password1) {
        this.alertController
          .create({
            header: 'Ambas contraseñas deben ser iguales',
            buttons: ['OK']
          }).then(alertEl => {
            alertEl.present();
          });
      } else {
        this.dM
          .signin(this.username, String(Md5.hashStr(this.password)))
          .then(data => {
            console.log(data);
            this.alertController
              .create({
                header: 'Se ha registrado correctamente',
                buttons: ['OK']
              }).then(alertEl => {
                alertEl.present();
              });

          })
          .catch(error => {
            console.log(error.error.message);
            switch (error.error.message) {

              case 'usuario ya cogido': {
                this.alertController
                  .create({
                    header: 'Ese usuario no está disponible.',
                    buttons: ['OK']
                  }).then(alertEl => {
                    alertEl.present();
                  });
                break;
              } default: {
                this.alertController
                  .create({
                    header: 'Se ha producido un error por favor vuelva a intentarlo más tarde.',
                    buttons: ['OK']
                  }).then(alertEl => {
                    alertEl.present();
                  });
              }

            }


          });
      }
    }

  }


  login() {

    let vacio: Boolean = false;
    if ((this.password === '') || (this.username === '')) {
      vacio = true;
    }

    if (vacio) {
      this.alertController
        .create({
          header: 'Todos los campos deben estar rellenos',
          buttons: ['OK']
        }).then(alertEl => {
          alertEl.present();
        });
    } else {
      this.dM
        .login(this.username, String(Md5.hashStr(this.password)))
        .then(data => {
          this.cookieServicee.delete('user');
          this.cookieServicee.delete('form');
          this.cookieServicee.delete('formUse');
          this.cookieServicee.set('user', JSON.stringify(data));
          this.navCtrl.navigateRoot('/data');
        })
        .catch(error => {
          console.log(error);

          switch (error.error.message) {

            case 'no coincide contrasena': {
              this.alertController
                .create({
                  header: 'La contraseña no coincide.',
                  buttons: ['OK']
                }).then(alertEl => {
                  alertEl.present();
                });
              break;
            } case 'no existe ese usuario': {
              this.alertController
                .create({
                  header: 'Ese usuario no está disponible.',
                  buttons: ['OK']
                }).then(alertEl => {
                  alertEl.present();
                });
              break;
            } default: {
              this.alertController
                .create({
                  header: 'Se ha producido un error por favor vuelva a intentarlo más tarde.',
                  buttons: ['OK']
                }).then(alertEl => {
                  alertEl.present();
                });
            }


          }
        });

    }

  }

}
