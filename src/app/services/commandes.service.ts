import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {

  constructor(private http:HttpClient) { }


  Allcommandes(): Observable<any[]> {

    return this.http.get<any[]>(baseURL + 'order/all')
  }

  getAllcommandeForClient(id): Observable<any[]> {

    return this.http.get<any[]>(baseURL + `order/get/${id}`)
  }



  postCommandes(Products): Observable<any> {
    const headers = new HttpHeaders({
      ContentType: "application/json"
    });
  
    return this.http.post(baseURL + "order/add", Products, { headers: headers });
  }

  updateCommandeClient(idClient,idCommande): Observable<any> {
    const headers = new HttpHeaders({
      ContentType: "application/json"
    });
  
    return this.http.post(baseURL + "order/updateOrderClient/"+idClient+'/'+idCommande, { headers: headers });
  }

  updateCommandeListProduit(listProd,idCommande): Observable<any> {
    const headers = new HttpHeaders({
      ContentType: "application/json"
    });
  
    return this.http.post(baseURL + "order/updateCommandeListProduit/"+idCommande,listProd, { headers: headers });
  }
  

  
}
