import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfoStringComponent } from './info-string/info-string.component';
import { IonicModule } from '@ionic/angular';
import { InfoURLComponent } from './info-url/info-url.component';

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";

export function HttpLoaderFactory(httpClient: HttpClient) {
	return new TranslateHttpLoader(httpClient, "../assets/i18n/", ".json");
}

@NgModule({
	declarations: [
		InfoStringComponent,
		InfoURLComponent
	],
	imports: [
		CommonModule,
		IonicModule,
		RouterModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
	],
	exports: [
		InfoStringComponent,
		InfoURLComponent
	],
})

export class ComponentsModule { }
