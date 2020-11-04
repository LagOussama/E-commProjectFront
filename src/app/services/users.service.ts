import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseURL';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  getUsers (): Observable<any> {
    const headers = new HttpHeaders(
      {
      'Content-Type': "text/plain",
    } );
   
    return this.http.get<any>(baseURL + `client/all`, {headers: headers});
             
    }

    DeleteUsers(id): Observable<any> {
      const headers = new HttpHeaders({
        ContentType: "application/json",
        Authorization: "bearer " + localStorage.getItem('token')
      });
    
      return this.http.post(baseURL + "client/deletebyid/" + id, { headers: headers });
    }

    putUsers(Products): Observable<any> {
      const headers = new HttpHeaders({
        ContentType: "application/json",
        Authorization: "bearer " + localStorage.getItem('token')
      });
    
      return this.http.post(baseURL + "client/update", Products, {
        headers: headers
      });
    }

  getUser (user: any): Observable<any> {
    const headers = new HttpHeaders(
      {
      'Content-Type': "text/plain",
    } );
   
    return this.http.get<any>(baseURL + `client/login/`+user.email+'/'+user.password, {headers: headers});
             
    }
    isLoggedIn(): boolean {
  
       return (localStorage.getItem('token') !== null);
    }

    isAdmin(): boolean {

      return (localStorage.getItem('role')== 'admin');
    }

    isSuperAdmin(): boolean {

      return (localStorage.getItem('role')== 'SuperAdmin');
    }
    
    addUser(user): Observable<any> {
      console.log(user);
      const headers = new HttpHeaders(
        {
        'Content-Type': 'application/json',
      } );
      
      return this.http.post<any>(baseURL + `client/add` , user, {headers: headers});
  
}
  
}
