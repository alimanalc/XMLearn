import { HttpClient, HttpRequest } from '@angular/common/http';
import { ConfigService } from './../../config/configService';
import { AbstractService } from './abstractService';
import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class RestService extends AbstractService {
    path: string;

    constructor(
        private config: ConfigService,
        http: HttpClient,
        private cookieService: CookieService
    ) {
        super(http);
        //Localhost:8080
        this.path = this.config.getConfig().restUrlPrefix;
    }


}