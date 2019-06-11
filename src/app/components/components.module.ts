import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfoStringComponent } from './info-string/info-string.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
	declarations: [
		InfoStringComponent
	],
	imports: [
		CommonModule,
		IonicModule,
		RouterModule,
	],
	exports: [
		InfoStringComponent
	],
})

export class ComponentsModule { }
