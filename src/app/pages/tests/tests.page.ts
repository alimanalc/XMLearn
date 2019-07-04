import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.page.html',
  styleUrls: ['./tests.page.scss'],
})
export class TestsPage implements OnInit {

  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  test1() {
    this.navCtrl.navigateRoot('/test1');
  }

  test2() {
    this.navCtrl.navigateRoot('/test2');
  }

  test3() {
    this.navCtrl.navigateRoot('/test3');
  }

  test4() {
    this.navCtrl.navigateRoot('/test4');
  }

  test5() {
    this.navCtrl.navigateRoot('/test5');
  }

}