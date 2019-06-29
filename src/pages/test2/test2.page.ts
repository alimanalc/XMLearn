import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { DataManagement } from 'src/app/services/dataManagement';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.page.html',
  styleUrls: ['./test2.page.scss'],
})
export class Test2Page implements OnInit {
  tag: string = "</test>"
  constructor(public menuCtrl: MenuController,
    public dM: DataManagement,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  runTest() {
    let test: string = this.tag;
    this.dM
      .runTest(test)
      .then(data => {

      })
      .catch(error => {
        console.log(error);
      });
  }
}
