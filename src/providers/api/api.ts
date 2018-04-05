import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    console.log('Hello ApiProvider Provider');
    this.baseUrl = 'http://192.168.1.3/rit/api';
  }

  login(username: string, password: string) {
    return this.postData(this.baseUrl + '/customers/login.json', {
      username: username,
      passsword: password
    });
  }

  private getAuthHeaders() {
    return {
      'Authentication': 'BASIC {0}'
    };
  }

  private postData(url, data, headers = {}) {

    // Prepares the headers
    var _headers = new HttpHeaders();
    Object.keys(headers).forEach(key => {
      _headers.append(key, headers[key]);
    });

    return new Promise((resolve, reject) => {
      this.http
        .post(url, data, { headers: _headers })
        .toPromise().then(resolve).catch(reject);
    });
  }

}
