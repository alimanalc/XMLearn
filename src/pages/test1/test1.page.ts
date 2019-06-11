import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.page.html',
  styleUrls: ['./test1.page.scss'],
})
export class Test1Page implements OnInit {

  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

}
