import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { DataManagement } from 'src/app/services/dataManagement';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.page.html',
  styleUrls: ['./test2.page.scss'],
})
export class Test2Page implements OnInit {
  tag: string = "</test>"
  constructor(public menuCtrl: MenuController,
    private cookieService: CookieService,
    public dM: DataManagement,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  runTest() {
    let test: string = this.tag;
    let url: string = this.cookieService.get('url');
    this.dM
      .runTest(test, url)
      .then(data => {

      })
      .catch(error => {
        console.log(error);
      });
  }
}
