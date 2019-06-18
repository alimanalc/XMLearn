import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { DataManagement } from 'src/app/services/dataManagement';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.page.html',
  styleUrls: ['./test1.page.scss'],
})
export class Test1Page implements OnInit {

  constructor(public menuCtrl: MenuController,
    public navCtrl: NavController,
    private dm: DataManagement) { }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  runTest() {
    this.dm
      .runTest(']]>')
      .then(data => {

      })
      .catch(error => {
        console.log(error);
      });
  }

}
