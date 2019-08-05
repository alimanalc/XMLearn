import { RestService } from './restService';
import { Injectable } from "@angular/core";
import { Request } from '../app.data.model';

@Injectable()
export class DataManagement {

    constructor(
        private restService: RestService,
    ) {

    }

    public runTest(url: string, fd: any): Promise<any> {
        return this.restService
            .runTest(url, fd)
            .then(data => {
                return Promise.resolve(data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    public login(username: string, password: string): Promise<any> {
        return this.restService
            .login(username, password)
            .then(data => {
                return Promise.resolve(data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }


    public signin(username: string, password: string): Promise<any> {
        return this.restService
            .signin(username, password)
            .then(data => {
                return Promise.resolve(data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    public createRequest(request: Request): Promise<any> {
        return this.restService
            .createRequest(request)
            .then(data => {
                return Promise.resolve(data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    public getRequests(): Promise<any> {
        return this.restService
            .getRequests()
            .then(data => {
                return Promise.resolve(data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }








}