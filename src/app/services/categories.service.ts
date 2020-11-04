import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseURL';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }


getAllCategories():Observable<any> {

  return this.http.get(baseURL + 'category/all');
}

getCat(id:String):Observable<any> {

  return this.http.get(baseURL + `category/getbyid/`+id)/*.pipe(
    map(cats => cats[0])) ;*/
}


postCategories(Categories): Observable<any> {
  const headers = new HttpHeaders({
    ContentType: "application/json",
    Authorization: "bearer " + localStorage.getItem('token')
  });
  return this.http.post(baseURL + "category/add", Categories, { headers: headers });
}
putCategories(Categories): Observable<any> {
  const headers = new HttpHeaders({
    ContentType: "application/json",
    Authorization: "bearer " + localStorage.getItem('token')
  });
  console.log(Categories)
  return this.http.post(baseURL + "category/update", {id:Categories.id,description:Categories.description,categoryName:Categories.categoryName}, {
    headers: headers
  });
}
DeleteCategories(id): Observable<any> {
  const headers = new HttpHeaders({
    ContentType: "application/json",
    Authorization: "bearer " + localStorage.getItem('token')
  });

  return this.http.post(baseURL + "category/deletebyid/" + id, { headers: headers });
}

PostImage(file): Observable<any> {
  const formData: any = new FormData();
  const headers = new HttpHeaders({
 
    Authorization: "bearer " + localStorage.getItem('token')
  });
  formData.append("file", file);

  return this.http.post(
    baseURL + `photos`,
    formData , {headers: headers}
  );
}
}
