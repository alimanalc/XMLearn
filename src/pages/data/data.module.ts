import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DataPage } from './data.page';
import { InfoStringComponent } from 'src/app/components/info-string/info-string.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { InfoURLComponent } from 'src/app/components/info-url/info-url.component';

const routes: Routes = [
  {
    path: '',
    component: DataPage
  }
];

@NgModule({
  entryComponents: [
    InfoStringComponent,
    InfoURLComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [DataPage]
})
export class DataPageModule { }
