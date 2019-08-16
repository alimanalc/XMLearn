import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, MenuController } from '@ionic/angular';
import { DataManagement } from 'src/app/services/dataManagement';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/app.data.model';
import { Md5 } from 'ts-md5/dist/md5';
import { TranslateService } from '@ngx-translate/core';

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
    public cookieService: CookieService,
    private translate: TranslateService
  ) {

  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }




  //Para que aparezca el form de login
  formLogin() {
    this.form = 1;
  }

  //Para que aparezca el form de signin
  formSignin() {
    this.form = 2;
  }

  //Registrarse
  signin() {

    let vacio: Boolean = false;
    if ((this.password === '') || (this.password1 === '') || (this.username === '')) {
      vacio = true;
    }

    if (vacio) {
      const translationAlertEmpty: string = this.translate.instant(
        'USER.EMPTY'
      );
      this.alertController
        .create({
          header: translationAlertEmpty,
          buttons: ['OK']
        }).then(alertEl => {
          alertEl.present();
        });
    } else {
      if (this.password != this.password1) {
        const translationAlertEqual: string = this.translate.instant(
          'USER.EQUAL'
        );
        this.alertController
          .create({
            header: translationAlertEqual,
            buttons: ['OK']
          }).then(alertEl => {
            alertEl.present();
          });
      } else {
        this.dM
          .signin(this.username, String(Md5.hashStr(this.password)))
          .then(data => {
            const translationAlertOkaySignIn: string = this.translate.instant(
              'USER.OKAY_SIGNIN'
            );
            this.alertController
              .create({
                header: translationAlertOkaySignIn,
                buttons: ['OK']
              }).then(alertEl => {
                alertEl.present();
              });

          })
          .catch(error => {
            switch (error.error.message) {
              case 'usuario ya cogido': {
                const translationAlertUserNo: string = this.translate.instant(
                  'USER.NO_USER'
                );
                this.alertController
                  .create({
                    header: translationAlertUserNo,
                    buttons: ['OK']
                  }).then(alertEl => {
                    alertEl.present();
                  });
                break;
              } default: {
                const translationAlertError: string = this.translate.instant(
                  'USER.ERROR'
                );
                this.alertController
                  .create({
                    header: translationAlertError,
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

  //Identificarse
  login() {

    let vacio: Boolean = false;
    if ((this.password === '') || (this.username === '')) {
      vacio = true;
    }

    if (vacio) {
      const translationAlertEmpty: string = this.translate.instant(
        'USER.EMPTY'
      );
      this.alertController
        .create({
          header: translationAlertEmpty,
          buttons: ['OK']
        }).then(alertEl => {
          alertEl.present();
        });
    } else {
      this.dM
        .login(this.username, String(Md5.hashStr(this.password)))
        .then(data => {
          this.cookieService.delete('user');
          this.cookieService.delete('form');
          this.cookieService.delete('formUse');
          this.cookieService.set('user', JSON.stringify(data));
          this.navCtrl.navigateRoot('/data');
        })
        .catch(error => {
          console.log(error);

          switch (error.error.message) {

            case 'no coincide contrasena': {
              const translationAlertPassword: string = this.translate.instant(
                'USER.ERROR_PASSWORD'
              );
              this.alertController
                .create({
                  header: translationAlertPassword,
                  buttons: ['OK']
                }).then(alertEl => {
                  alertEl.present();
                });
              break;
            } case 'no existe ese usuario': {
              const translationAlertUser: string = this.translate.instant(
                'USER.ERROR_USER'
              );
              this.alertController
                .create({
                  header: translationAlertUser,
                  buttons: ['OK']
                }).then(alertEl => {
                  alertEl.present();
                });
              break;
            } default: {
              const translationAlertError: string = this.translate.instant(
                'USER.ERROR'
              );
              this.alertController
                .create({
                  header: translationAlertError,
                  buttons: ['OK']
                }).then(alertEl => {
                  alertEl.present();
                });
            }


          }
        });

    }

  }

  //Cambiar el idioma
  changeLanguage(selectedValue: { detail: { value: string } }) {
    this.cookieService.set('lang', selectedValue.detail.value);
    this.translate.use(selectedValue.detail.value);
  }

}
