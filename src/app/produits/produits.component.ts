import { Component, OnInit , Inject} from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { flyInOut , expand} from '../animations/animations';
import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../services/categories.service';


@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss'] ,
   animations: [ flyInOut() ,
  expand()]
})
export class ProduitsComponent implements OnInit {
products: [] ;
categorieId ;
categorie
  constructor(private productService: ProduitsService, @Inject('baseURL') public baseURL 
  , private route: ActivatedRoute , private categoriesService: CategoriesService) { }

  ngOnInit() {

    this.route.params.pipe(switchMap((params: Params) => { this.categorieId=  params['catid'] ; return  this.productService.getProductsWithIdCategorie(params['catid']); }) )
    .subscribe(products => this.handel(products));


  }
  handel(products) {
    this.products = <any> products
 
    this.categoriesService.getCat(this.categorieId).subscribe(
      categorie => {this.categorie = categorie ; console.log(categorie)}
    )
  }

} 
