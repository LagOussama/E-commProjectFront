import { Component, OnInit, Inject } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { expand } from '../animations/animations';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'] ,
  animations: [ 
    expand()]
})
export class CategoriesComponent implements OnInit {

  Categories: [] ;
  constructor(private CategoriesService: CategoriesService, @Inject('baseURL') public baseURL) { }

  ngOnInit() {

    this.CategoriesService.getAllCategories().subscribe(
         Categories=> {this.Categories = <any> Categories; console.log(Categories);}
         

    )
  }
}
