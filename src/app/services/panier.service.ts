import { Injectable } from '@angular/core';
import { Subject, Observable, from, forkJoin } from 'rxjs';
import { mergeMap, concatMap, map, concatAll } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import { NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core/src/view/provider';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  constructor(private http: HttpClient) { }

  
  private Panier = new Subject<number>();
  
//cv
    getPanier(): Observable<number> {
    return this.Panier.asObservable();
  }

  postCommandes(cmd): Observable<any> {
    const headers = new HttpHeaders({
      ContentType: "application/json",
      Authorization: "bearer " + localStorage.getItem('token')
    }).set('Access-Control-Allow-Origin', '*');
  
    return this.http.post(baseURL + "order/add", cmd, { headers: headers });
  }

  deleteItem(id){
    var m = JSON.parse(localStorage.getItem("products"));
    var notfound=true;
    var newlist=[];
    m.forEach(element => {
      if(notfound && element.id==id){
        notfound=false;
      }else{
        newlist.push(element);
      }
    });
    localStorage.setItem('products', JSON.stringify(newlist));
    this.Panier.next(newlist.length);
    return newlist;
  }

  getPanierProduct(){
    return JSON.parse(localStorage.getItem("products"));
  }
//cv
  setItem(providerResponse: any) {
    var m =[] ;
  if (localStorage.getItem('products')!== null) {
   m = JSON.parse(localStorage.getItem("products"));
   
  }

//if(!this.existe(providerResponse, m )) {
    m.push(providerResponse);
   localStorage.setItem('products', JSON.stringify(m));

   
    this.Panier.next(m.length);
    m =  [] ;
//}
  }

  existe(id: number, m:any ): boolean {
    return m.some(el => el === id);
}

//non
getIQPanier() : Observable<any> {

  var idsQT = JSON.parse(localStorage.getItem("products"));
      
  /*return <Observable<Array<any>>> forkJoin(
    ids.map(id => <Observable<any>> this.getProduct(id))).pipe(concatAll()); */

return from(idsQT).pipe(mergeMap(id => <Observable<any>> this.getQT(id)))

    
  }
//non
AjouterQuantiteProduit(QT):Observable<any>{

  const headers = new HttpHeaders({
    ContentType: "application/json"
  });

  return this.http.post(baseURL + "quantité_produits", QT, { headers: headers });
}
//non
PostPanier(panier):Observable<any>{

  const headers = new HttpHeaders({
    ContentType: "application/json",
    Authorization: "bearer " + localStorage.getItem('token')
  });
  

  return this.http.post(baseURL + "paniers", panier, { headers: headers });

  }
//non
updateQTproduit(idPanier) :Observable<any>{

const headers = new HttpHeaders({
    ContentType: "application/json"
  });

  var idsQT = JSON.parse(localStorage.getItem("products"));
      
  /*return <Observable<Array<any>>> forkJoin(
    ids.map(id => <Observable<any>> this.getProduct(id))).pipe(concatAll()); */
    return from(idsQT).pipe(concatMap(id => <Observable<any>> 
      this.http.put(baseURL + "quantité_produits/" + id, { 

      "id_panier": idPanier ,
    
    }, {
      headers: headers
    })  
    )); 

}

//non
updateQTproduitQT(idQT, QT) :Observable<any>{

  const headers = new HttpHeaders({
      ContentType: "application/json"
    });
  
    let x = parseInt(QT) ;
    console.log("xxxxxxxxx" +x) ;

    /*return <Observable<Array<any>>> forkJoin(
      ids.map(id => <Observable<any>> this.getProduct(id))).pipe(concatAll()); */
      return this.http.put(baseURL + "quantité_produits/" + idQT, { 
     
        "quantite_produit": x
      
      }, {
        headers: headers
      })   ;
  
  }



/*return from(idsQT).pipe(concatMap(id => <Observable<any>> this.getQT(id).pipe

(concatMap(QT => <Observable<any>>  this.http.put(baseURL + "quantité_produits/" + QT.id_qt, { 

  "id_panier": idPanier ,
  "id_qt": QT.id_qt ,
  "id_produit": QT.id_produit
}, {
  headers: headers
})  
) 
) 
)
);*/

  



//non
getQT(id): Observable<any>{

  return this.http.get(baseURL + `quantité_produits/${id}`);
  }

//non
getProductFromQT(id): Observable<any>{

return this.http.get(baseURL + `quantité_produits/produit/${id}`);
}
//non
getProduct(id):Observable<any> {

  return this.http.get(baseURL + 'produits/' + id);
}
//cv
deletePanier() {
  /*var ids = JSON.parse(localStorage.getItem("products"));
  let index = ids.indexOf(id);
  if (index >= 0) {
    ids.splice(index,1);
    localStorage.setItem('products', JSON.stringify(ids));
    this.Panier.next(ids.length);

    callback(null, ids)
    }*/
    localStorage.setItem("products",JSON.stringify([]));
    this.Panier.next(0);
  
}
//cv
notifyPanier(){
  var ids: [] = [] ;
   if  (JSON.parse(localStorage.getItem("products")))
   {
     ids = JSON.parse(localStorage.getItem("products"));
   }

  this.Panier.next(ids.length);
}

 
}
