import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController, NavParams } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { DataManagement } from 'src/app/services/dataManagement';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-negative',
  templateUrl: './negative.page.html',
  styleUrls: ['./negative.page.scss'],
})
export class NegativePage implements OnInit {
  test = null;
  constructor(public menuCtrl: MenuController,
    private cookieService: CookieService,
    public dM: DataManagement,
    public navCtrl: NavController,
    public alertController: AlertController,
    private activeRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.test = this.activeRoute.snapshot.paramMap.get('test');
    console.log(this.test);
  }

}
