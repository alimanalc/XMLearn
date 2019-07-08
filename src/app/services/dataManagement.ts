import { RestService } from './restService';
import { Injectable } from "@angular/core";

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



}