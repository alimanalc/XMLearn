import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'

@Injectable()
export class AbstractService {

    constructor(
        private http: HttpClient
    ) {

    }

    // private getHeaders(): Promise<HttpHeaders> {
    //     return new Promise((resolve) => {
    //         let headers = new HttpHeaders();
    //         headers = headers.append("Accept", "application/json");
    //         resolve(headers);
    //     })
    // }



    private getHeaders(token: string): Promise<HttpHeaders> {
        return new Promise(resolve => {
            let headers = new HttpHeaders();
            headers = new HttpHeaders().set('Accept', 'application/json');
            // headers = headers.append('Access-Control-Allow-Origin', '*');
            // headers = headers.append('Access-Control-Allow-Headers', 'Content-Type');
            headers = headers.append('Content-Type', "application/x-www-form-urlencoded");
            resolve(headers);
        });
    }

    private getHeaders2(user, password): Promise<HttpHeaders> {
        return new Promise((resolve) => {
            let headers = new HttpHeaders();
            headers = headers.append("Accept", "application/json");
            headers = headers.append("Authorization", "Basic " + btoa(user + ":" + password));
            resolve(headers);
        })
    }

    protected makeGetRequest(path: string, paramsRequest: any): Promise<any> {
        if (!paramsRequest)
            paramsRequest = {};

        return this.getHeaders(null).then((result) => {
            return new Promise((resolve, reject) => {
                this.http.get(path, { headers: result, params: paramsRequest }).subscribe(response => {
                    resolve(response);
                }, error => {
                    if (error.status == 200) {
                        resolve(null);
                    } else {
                        console.log(error);
                        reject(error);
                    }
                });
            });
        });
    }

    protected makeGetRequest2(path: string, paramsRequest: any, user: string, password: string): Promise<any> {
        if (!paramsRequest)
            paramsRequest = {};
        return this.getHeaders2(user, password).then((result) => {
            return new Promise((resolve, reject) => {
                this.http.get(path, { headers: result, params: paramsRequest }).subscribe(response => {
                    resolve(response);
                }, error => {
                    if (error.status == 200) {
                        resolve(null);
                    } else {
                        console.log(error);
                        reject(error);
                    }
                });
            });
        });
    }

    protected makePostRequest(path: string, data: any): Promise<any> {
        return this.getHeaders(null).then((result) => {
            return this.http.post(path, data, { headers: result })
                .toPromise()
                .then((result: HttpResponse<any>) => {
                    return Promise.resolve(result);
                }).catch((err) => {
                    return Promise.reject(err);
                });
        });
    }


}
