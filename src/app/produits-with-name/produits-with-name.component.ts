import { Component, OnInit, Inject } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { CategoriesService } from '../services/categories.service';
import { Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { expand } from '../animations/animations';

@Component({
  selector: 'app-produits-with-name',
  templateUrl: './produits-with-name.component.html',
  styleUrls: ['./produits-with-name.component.scss'] ,

   animations: [ 
  expand()]
  
})
export class ProduitsWithNameComponent implements OnInit {
  products: [] ;
  categorieId ;
  categorie
  name: '' ;
    constructor(private productService: ProduitsService, @Inject('baseURL') public baseURL ,
 private categoriesService: CategoriesService) {


  }
  
    ngOnInit() {
  
  
      
    
       
      this.productService.getAllProducts()
       .subscribe(products => this.handel(products));
 
   
   this.productService.getRechercheName().pipe(switchMap((name) => { 
        
       this.name = name ; console.log("nameeee" +this.name); 
       if(this.name.length>0) { return  this.productService.getProduct(name)}
        else {return this.productService.getAllProducts()}
       ; 
      
      }) )
      .subscribe(products => this.handel(products));
 
  
    }
    handel(products) {
      this.products = <any> products
    console.log("produitssss"+this,products.length) ;
    
   
    /*  this.categoriesService.getCat(this.categorieId).subscribe(
        categorie => {this.categorie = categorie ; console.log(categorie)}
      )*/
    }

}
