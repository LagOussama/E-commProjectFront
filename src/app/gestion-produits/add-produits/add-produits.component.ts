import { Component, OnInit } from '@angular/core';
import { ProduitsService } from 'src/app/services/produits.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ModalComponent } from 'src/app/modal/modal.component';
import { switchMap } from 'rxjs/operators';
import { CategoriesComponent } from 'src/app/categories/categories.component';
import { CategoriesService } from 'src/app/services/categories.service';
import { setDOM } from '@angular/platform-browser/src/dom/dom_adapter';

@Component({
  selector: 'app-add-produits',
  templateUrl: './add-produits.component.html',
  styleUrls: ['./add-produits.component.scss']
})
export class AddProduitsComponent implements OnInit {

  selectedCategorie=1 ;
  Produit = {
    designation: '',
    description:'',
    price:0 ,
    productCategory:null
    };
   

    categories;

  file: File; 
 

  constructor(
    private ProduitService: ProduitsService ,
    private dialog: MatDialog,
    private categorieService: CategoriesService,
    private AdduserDialog: MatDialogRef<AddProduitsComponent>
  ) {}

  ngOnInit() {

    this.categorieService.getAllCategories().subscribe(
      cat => this.categories = cat
      
    )
    
  }


  addProduit() {
    console.log('selected act: '+this.selectedCategorie)
    this.categorieService.getCat(String(this.selectedCategorie)).subscribe(cat=> this.handler(cat) )
 // this.Produit.productCategory = this.selectedCategorie ;
  console.log(this.Produit)
    
    /*this.ProduitService.PostImage(this.file).pipe(switchMap(data => 
      { this.Produit.id_photo = data.id_photo ; console.log("image" + data) ; return this.ProduitService.postProducts(this.Produit)}
       )).subscribe(data => this.OpenSuccModal("Produit ajouté avec succès"))*/
  }
  handler(cat){
    
   //this.Produit.productCategory=cat
    console.log(this.Produit)
      this.ProduitService.postProducts(this.Produit).subscribe(data => this.handlerupdateProductCategory(data.id,cat.id) )
  }
  handlerupdateProductCategory(idProd,idCat){
    this.ProduitService.putProductsCategory(idProd,idCat).subscribe(data => this.OpenSuccModal("Produit ajouté avec succès"))
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

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.AdduserDialog.close();
    });
  }

  onFilesChangef(event) {

    this.file = event.target.files.item(0);
   
  }

}
