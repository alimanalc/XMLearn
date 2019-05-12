import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    constructor() {

    }

    public getConfig(): any {
        let urlPrefix = 'http://localhost.com/';
        let urlApi = '';

        return {
            restUrlPrefix: urlPrefix + urlApi
        };
    }
}


