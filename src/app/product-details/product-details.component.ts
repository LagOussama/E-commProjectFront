import { Component, OnInit , Inject} from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PanierService } from '../services/panier.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
  
})
export class ProductDetailsComponent implements OnInit {
product ;
categorie= null ;
products;
constructor(private productService: ProduitsService, private route: ActivatedRoute, @Inject('baseURL') public baseURL
, private panierService: PanierService, private categoriesService: CategoriesService) { }

  ngOnInit() {

    this.route.params.pipe(switchMap((params: Params) => {  return  this.productService.getProduct(params['id']); }) ) 
    .subscribe(product => this.handel(product));

    
    
  }

handel(product) {

  this.product = product ;
console.log("id-catalogue"+ product.id) ;
  this.categoriesService.getCat(product.productCategory.id).subscribe(
    categorie => {this.categorie = categorie ; console.log(categorie)}
  )

  this.productService.getProductsWithIdCategorie(this.product.productCategory.id)
        .subscribe(
          products => {this.products = products}
        );
      

}

AddToPanier(product) {

  this.panierService.setItem(product);
}

AddQT(id) {

let QT = {"id" : id , "quantite_produit" : 1 }
this.AddToPanier(id)
  /*this.panierService.AjouterQuantiteProduit(QT).subscribe(qt =>{ <any> this.AddToPanier(qt.id), console.log(qt)}
    ) ;*/
}


}
