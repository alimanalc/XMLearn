import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController, NavParams } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { DataManagement } from 'src/app/services/dataManagement';

@Component({
  selector: 'app-negative',
  templateUrl: './negative.page.html',
  styleUrls: ['./negative.page.scss'],
})
export class NegativePage implements OnInit {
  test: string;
  constructor(public menuCtrl: MenuController,
    private cookieService: CookieService,
    public dM: DataManagement,
    public navCtrl: NavController,
    public alertController: AlertController) {
    this.test = '0';
  }

  ngOnInit() {
  }

}
