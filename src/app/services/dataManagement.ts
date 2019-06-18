import { RestService } from './restService';
import { Injectable } from "@angular/core";

@Injectable()
export class DataManagement {

    constructor(
        private restService: RestService,
    ) {

    }

    public runTest(test: string): Promise<any> {
        return this.restService
            .runTest(test)
            .then(data => {
                return Promise.resolve(data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }



}