import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { ConfigService } from './../../config/configService';
import { AbstractService } from './abstractService';
import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { User, Request } from '../app.data.model';

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


    public login(username: string, password: string) {
        let fd = new HttpParams();
        fd = fd.append('username', username);
        fd = fd.append('password', password);
        return this.makePostRequest(this.path + '/route/login', fd)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(error => {
                console.log('Error: ' + error);
                return Promise.reject(error);
            });
    }


    public signin(username: string, password: string) {
        let fd = new HttpParams();
        fd = fd.append('username', username);
        fd = fd.append('password', password);
        return this.makePostRequest(this.path + '/route/signin', fd)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(error => {
                console.log('Error: ' + error);
                return Promise.reject(error);
            });
    }


    public createRequest(request: Request) {
        let user: User = JSON.parse(this.cookieService.get('user'));
        let fd = new HttpParams();
        fd = fd.append('name', request.name);
        fd = fd.append('url', request.url);
        fd = fd.append('attributes', JSON.stringify(request.attributes));
        fd = fd.append('_id', user._id);
        return this.makePostRequest(this.path + '/route/createRequest', fd)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(error => {
                console.log('Error: ' + error);
                return Promise.reject(error);
            });
    }

    public getRequests() {
        let fd = new HttpParams();
        let user: User = JSON.parse(this.cookieService.get('user'));
        fd = fd.append('_id', user._id);
        return this.makePostRequest(this.path + '/route/requests', fd)
            .then(res => {

                return Promise.resolve(res);
            })
            .catch(error => {
                console.log('Error: ' + error);
                return Promise.reject(error);
            });
    }


}
