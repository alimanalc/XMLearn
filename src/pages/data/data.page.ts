import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {
  url: string;
  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController, private cookieService: CookieService) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  nextPage() {

    this.navCtrl.navigateRoot('/data2');
  }

  selectedLanguage(language) {
    if (language === true)
      this.cookieService.set('language', "php");

    if (language === false)
      this.cookieService.set('language', "javaScript");

    console.log(this.cookieService.get('language'));

  }

}
