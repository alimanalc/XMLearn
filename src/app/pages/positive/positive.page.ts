import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-positive',
  templateUrl: './positive.page.html',
  styleUrls: ['./positive.page.scss'],
})
export class PositivePage implements OnInit {
  status = null;
  constructor(
    private activeRoute: ActivatedRoute,
    public cookieService: CookieService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.status = this.activeRoute.snapshot.paramMap.get('status');
  }

  //Cambiar el idioma
  changeLanguage(selectedValue: { detail: { value: string } }) {
    this.cookieService.set('lang', selectedValue.detail.value);
    this.translate.use(selectedValue.detail.value);
  }

}
