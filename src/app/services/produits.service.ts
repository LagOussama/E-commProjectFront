import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import { Observable, Subject, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  constructor(private http: HttpClient) { }


  private Rech = new Subject<any>();
  private obs: Observable<any> = new Observable() ;
  public Onclcik = new Subject() ;
  getRechercheName(): Observable<any> {
  return this.obs ;
}

getCliked(): Observable<any> {
  return this.Onclcik.asObservable() ;
}
getAllProducts():Observable<any> {
  const headers = new HttpHeaders({
    ContentType: "application/json"
  }).set('Access-Control-Allow-Origin', '*');
  return this.http.get(baseURL + 'product/all',{ headers: headers });
}

getProductsWithIdCategorie(IdCategorie: String):Observable<any> {

  return this.http.get(baseURL + `product/getbycat/${IdCategorie}`);
}

getProduct(id):Observable<any> {

  return this.http.get(baseURL + 'product/get/' + id);
}

getProductWithName(id):Observable<any> {

  return this.http.get(baseURL + `product/get/${id}`);
}


postProducts(Products): Observable<any> {
  const headers = new HttpHeaders({
    ContentType: "application/json",
    Authorization: "bearer " + localStorage.getItem('token')
  }).set('Access-Control-Allow-Origin', '*');

  return this.http.post(baseURL + "product/add", Products, { headers: headers });
}
putProducts(Products): Observable<any> {
  const headers = new HttpHeaders({
    ContentType: "application/json",
    Authorization: "bearer " + localStorage.getItem('token')
  });

  return this.http.post(baseURL + "product/update", Products, {
    headers: headers
  });
}

putProductsCategory(idProd,idCat): Observable<any> {
  const headers = new HttpHeaders({
    ContentType: "application/json",
    Authorization: "bearer " + localStorage.getItem('token')
  });

  return this.http.post(baseURL + "product/updateProductCat/"+idProd+'/'+idCat,  {
    headers: headers
  });
}
DeleteProducts(id): Observable<any> {
  const headers = new HttpHeaders({
    ContentType: "application/json",
    Authorization: "bearer " + localStorage.getItem('token')
  });

  return this.http.post(baseURL + "product/deletebyid/" + id, { headers: headers });
}

PostImage(file): Observable<any> {
  const formData: any = new FormData();
  const headers = new HttpHeaders({
   
    Authorization: "bearer " + localStorage.getItem('token')
  });
  formData.append("file", file);

  return this.http.post(
    baseURL + `photos`,
    formData ,{headers: headers}
  );
}


do(obs, searchTextRef){
console.log("obsss"+obs);
 this.obs = obs
 
  .pipe(
    map(event => searchTextRef.nativeElement.value  ) ,
      debounceTime(500),
      distinctUntilChanged()
  )
}





}
