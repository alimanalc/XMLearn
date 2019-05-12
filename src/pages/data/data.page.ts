import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {
  lenguaje: string = "";
  formulario: string = "";
  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController, private cookieService: CookieService) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  siguiente() {

    this.navCtrl.navigateRoot('/data2');
  }

  selected1() {
    if (this.lenguaje === "php")
      this.cookieService.set('lenguaje', "php");

    if (this.lenguaje === "javaScript")
      this.cookieService.set('lenguaje', "javaScript");

  }

  selected2() {
    if (this.formulario === "example")
      this.cookieService.set('formulario', "example");

    if (this.formulario === "mine")
      this.cookieService.set('formulario', "mine");

  }

}
