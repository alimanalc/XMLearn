import { HttpClient, HttpRequest } from '@angular/common/http';
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


    public runTest(test: string, url: string) {
        const fd = new FormData();
        let form: Form;
        form = JSON.parse(this.cookieService.get('form'));
        for (let entry of form.atributos) {
            let nombre: string;
            nombre = entry.name;
            console.log(entry.name);
            if (entry.value === 'none') {
                fd.append(nombre, entry.value);
            } else {
                fd.append(nombre, test);
            }
        }

        return this.makePostRequest(url, fd)
            .then(res => {
                console.log('Logged successfully');
                return Promise.resolve(res);
            })
            .catch(error => {
                console.log('Error: ' + error);
                return Promise.reject(error);
            });
    }

}