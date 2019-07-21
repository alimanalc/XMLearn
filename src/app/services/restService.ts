import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { ConfigService } from './../../config/configService';
import { AbstractService } from './abstractService';
import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { Form } from '../app.data.model';

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


    public runTest(url: string, fd: HttpParams) {

        return this.makePostRequest(url, fd)
            .then(res => {
                console.log("Data: " + res.status);
                return Promise.resolve(res);
            })
            .catch(error => {
                console.log('Error: ' + error);
                return Promise.reject(error);
            });
    }
}
