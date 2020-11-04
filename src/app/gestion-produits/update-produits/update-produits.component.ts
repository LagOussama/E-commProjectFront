import { Component, OnInit, Inject } from '@angular/core';
import { ProduitsService } from 'src/app/services/produits.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-update-produits',
  templateUrl: './update-produits.component.html',
  styleUrls: ['./update-produits.component.scss']
})
export class UpdateProduitsComponent implements OnInit {

 
  produit = {
    designation: '',
    description:'',
    price:0 
    };
    
    constructor(
      @Inject(MAT_DIALOG_DATA) public data,
        private produitService: ProduitsService ,
        private dialog: MatDialog,
        private UpdateDialog: MatDialogRef<UpdateProduitsComponent>
      ) 
    {
      console.log(data.data);
    }
  
    ngOnInit() {
      this.produit = this.data.data;
    
    }
  
    UpdateProduit() {
     
      this.produitService.putProducts(this.produit).subscribe(user => {
        this.produit = user;
     this.OpenSuccModal("Produit modifié avec succès");
      });
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
        this.UpdateDialog.close();
      });
    }

}
