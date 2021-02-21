import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LoginInput } from '../services/models/LoginInput';

@Injectable()
export class AuthService {
     
    constructor(private http: HttpClient) {
    }
      
    login(email:string, password:string ) {
        return this.http.post<LoginInput>('/api/login', {email, password})
            // this is just the HTTP call, 
            // we still need to handle the reception of the token
            // .shareReplay();
    }
}
