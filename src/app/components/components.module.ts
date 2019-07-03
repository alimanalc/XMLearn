import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfoStringComponent } from './info-string/info-string.component';
import { IonicModule } from '@ionic/angular';
import { InfoURLComponent } from './info-url/info-url.component';


@NgModule({
	declarations: [
		InfoStringComponent,
		InfoURLComponent
	],
	imports: [
		CommonModule,
		IonicModule,
		RouterModule,
	],
	exports: [
		InfoStringComponent,
		InfoURLComponent
	],
})

export class ComponentsModule { }
