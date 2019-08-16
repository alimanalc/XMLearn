import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-negative',
  templateUrl: './negative.page.html',
  styleUrls: ['./negative.page.scss'],
})
export class NegativePage implements OnInit {
  test: string;
  status: string;
  constructor(
    private cookieService: CookieService,
    private activeRoute: ActivatedRoute,
    public translate: TranslateService) {

  }

  ngOnInit() {
    this.test = this.activeRoute.snapshot.params.test;
    this.status = this.activeRoute.snapshot.params.status;
  }

  //Cambiar el idioma
  changeLanguage(selectedValue: { detail: { value: string } }) {
    this.cookieService.set('lang', selectedValue.detail.value);
    this.translate.use(selectedValue.detail.value);
  }

}
