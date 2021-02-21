import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, timer, Observable, } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { Client } from '../../interfaces/client';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
  // url ='https://idmusichtml.azurewebsites.net/api/client';
  // url2 ='https://idmusichtml.azurewebsites.net/api/upload';
  url ='http://localhost:64483/api/client';
  url2 ='http://localhost:64483/api/upload';
  url3 ='http://localhost:64483/api/login';

  constructor (private http: HttpClient){}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(this.url+ '/' + id)
  }
  // saveClient(client:Client){
  //   return this.http.post<Client>('https://idmusichtml.azurewebsites.net/api/client',client);

  // }
  public InsertLogin(data: any) : Observable<any>
  {
     return this.http.post(`${this.url3}`, data, {});
  }



  saveClient(client:Client): Observable<Client>{
    debugger;
    
    return this.http.post<Client>(this.url, JSON.stringify(client), this.httpOptions);
  }

  saveClientPhoto(client:Client): Observable<Client>{
    return this.http.post<Client>(this.url2, JSON.stringify(client), this.httpOptions);
  }
  
  updateClient(client:Client): Observable<Client> {
    return this.http.put<Client>(this.url + '/' + client.id, this.httpOptions);
      
  }
 

  deleteClient(client:Client){
    return this.http.delete<Client>(this.url + '/' + client.id, this.httpOptions);
  }
  
  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, `+` mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
