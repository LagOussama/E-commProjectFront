import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PanierService } from '../services/panier.service';
import { UsersService } from '../services/users.service';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { CategoriesService } from '../services/categories.service';
import { Router } from '@angular/router';
import { ProduitsService } from '../services/produits.service';
import { ViewEncapsulation } from '@angular/compiler/src/core';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'] 
})
export class NavComponent implements AfterViewInit , OnInit{
  @ViewChild('searchText') searchTextRef;
 
  nbr = 0 ;
  categories; 
   selectedCategorie ;
  obs ;
  height=""
  width= ""
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([
    Breakpoints.HandsetLandscape,
    Breakpoints.HandsetPortrait
  ]).pipe(
      map(result => result.matches)
    )

  constructor(private breakpointObserver: BreakpointObserver , private panierServer: PanierService , 
    public userservice: UsersService, private dialog: MatDialog, private categorieService: CategoriesService, 
    private router: Router, private produitService: ProduitsService) {
      
      
this.isHandset$.subscribe(data => {
  
  if(data){
    this.width = "300px";
    this.height = "300px";
} else {

  this.width = "500px";
    this.height = "450px";

} 

});
    if (localStorage.getItem("products")) {
    this.nbr = JSON.parse(localStorage.getItem("products")).length;
    }
    this.panierServer.getPanier().subscribe(
      nbr => this.nbr = nbr
    )

  }


 

  ngAfterViewInit() {
   
 
  }

  onchange() {
    if (this.searchTextRef) {
      this.obs = fromEvent(this.searchTextRef.nativeElement, 'keyup');

      
     
     console.log("sauut");
      this.produitService.do(this.obs, this.searchTextRef) ;
}


  }
    
    

  openLogin() {

    this.dialog.open(LoginComponent , {width:this.width , height: this.height })
    }
  
  logout() {
          localStorage.removeItem("id") ;
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          this.router.navigate(['/categories']);
      }

      onclick(){

        this.router.navigate(['/produits/name']);
        this.produitService.Onclcik.next("clicked");

      }



    ngOnInit() {
      if (this.searchTextRef) {
      this.obs = fromEvent(this.searchTextRef.nativeElement, 'keyup');
      console.log("sauuddddt");

      }
      this.categorieService.getAllCategories().subscribe(
           Categories=> this.categories = <any> Categories
  
      )
    }

  getProducts() {
    console.log(this.selectedCategorie);
    if(this.selectedCategorie) {

      this.router.navigate(['/products' , this.selectedCategorie]);
            

    }
  }

}
