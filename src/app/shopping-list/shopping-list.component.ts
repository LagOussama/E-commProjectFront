import { Component, OnInit, Inject } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { mergeMap, map, concatAll, switchMap, switchMapTo } from 'rxjs/operators';
import { PanierService } from '../services/panier.service';
import {CommandesService} from '../services/commandes.service';
import { Observable, Observer } from 'rxjs';
import { expand } from '../animations/animations';
import { UsersService } from '../services/users.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { ModalComponent } from '../modal/modal.component';
import { HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'] ,
  animations: [
    expand()]
})
export class ShoppingListComponent implements OnInit {
  commande={
    orderState:'Validé'
  }

  shops = [] ;
  total = 0 ;
  time ;
  quantite  = [
    {value: '1', viewValue: '1' , selected: true},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'},
    {value: '6', viewValue: '6'},
    {value: '7', viewValue: '7'},
    {value: '8', viewValue: '8'},
    {value: '9', viewValue: '9'}
  ];
  selectedQ: String;

// quantite: ['1', '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9' , '10' ];
  constructor(private shopService: PanierService, @Inject('baseURL') public baseURL, private userService: UsersService ,
  
  private dialog: MatDialog,private commandesService:CommandesService) { }

  passerCommande(){
    //this.commande.productList=this.shops;
    console.log(this.commande)
    this.commandesService.postCommandes(this.commande).subscribe(res=> this.handler(res));
  }

  handler(res){
    this.commandesService.updateCommandeClient(localStorage.getItem('id'),res.id).subscribe(res=>{
      var prods=[];
       this.shops.forEach(prod=> prods.push(prod.id))
       console.log()
       this.commandesService.updateCommandeListProduit(prods,localStorage.getItem('id')).subscribe(res=>{

        this.shops = [] ;
        this.shopService.deletePanier() 
       })

    })
    
  }


  

  ngOnInit() {

    this.shops=this.shopService.getPanierProduct()
    console.log(this.shops);
    this.shops.forEach(element => {
      this.total=this.total+element.price;
    });
    /*try{
  
 this.shopService.getIQPanier().subscribe(
 products => {this.shops.push(products) ;  this.total = this.total +(products.Produit.prix * products.quantite_produit)  } 
   )
   this.time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
 
    } 
    catch(e) {

      console.log(e);

    }*/

}
OpenSuccModal(msg) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;

  dialogConfig.width = "300px";
  dialogConfig.height = "200px";
  dialogConfig.data = {
    message: msg
  };
}

deleteShop() {
  this.total=0;
  this.shops = [] ;
  this.shopService.deletePanier() 
}
deleteItem(id) {
  this.shops=this.shopService.deleteItem(id);
  this.total=0;
  this.shops.forEach(el=> {
    this.total=this.total+el.price;
  })
  }



AddPanier() {


  if(this.shops.length == 0){

    this.OpenModal("Panier vide");

  }

  

else if(this.userService.isLoggedIn() ) {

let panier = {"prixtotal" : this.total , "id" : localStorage.getItem("id") }


  this.shopService.PostPanier(panier).pipe(switchMap(panier => {
 
    
   return this.shopService.updateQTproduit(panier.id_panier)  } )).subscribe(
       next => {localStorage.removeItem("products") ; this.shops = []; this.total = 0; 
      
      this.shopService.notifyPanier()}

    )
} 


else {

  this.dialog.open(LoginComponent , {width:'500px' , height: '450px'})
  
   }
}
UpdateQT(id, nvQ) {
  
  
     return this.shopService.updateQTproduitQT(id, nvQ).pipe(switchMap(data => 
      
       { this.total = 0 ; return  this.shopService.getIQPanier()} )).subscribe(
        products => {  this.total = this.total +(products.Produit.price * products.quantite_produit)  } 
          ) ;
  }




OpenModal(msg) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;

  dialogConfig.width = "300px";
  dialogConfig.height = "200px";
  dialogConfig.data = {
    message: msg
  };

  const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(result => {
  
  });
}

}