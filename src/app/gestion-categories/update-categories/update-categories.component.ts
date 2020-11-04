import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogConfig, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ModalComponent } from 'src/app/modal/modal.component';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrls: ['./update-categories.component.scss']
})
export class UpdateCategoriesComponent implements OnInit {

  categorie ;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
      private categorieService: CategoriesService ,
      private dialog: MatDialog,
      private UpdateDialog: MatDialogRef<UpdateCategoriesComponent>
    ) 
  {
    console.log(data.data);
  }

  ngOnInit() {
    this.categorie = this.data.data;
  
  }

  UpdateCategorie() {
   
    this.categorieService.putCategories(this.categorie).subscribe(user => {
      this.categorie = user;
   this.OpenSuccModal("Categorie modifiée avec succès");
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
