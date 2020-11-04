import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { CategoriesService } from 'src/app/services/categories.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent implements OnInit {

  categorie = {
    categoryName: "",
    description: ""
  };

  file: File ;
 

  constructor(
    private categorieService: CategoriesService ,
    private dialog: MatDialog,
    private AdduserDialog: MatDialogRef<AddCategoriesComponent>
  ) {}

  ngOnInit() {}

  addCategorie() {

    return this.categorieService.postCategories(this.categorie).subscribe(data =>  {this.OpenSuccModal("Categorie ajoutée avec succès");
    this.categorie.categoryName = "" ,
    this.categorie.description = ""})
    /*this.categorieService.PostImage(this.file).pipe(switchMap(data => 
      { this.categorie.id_photo = data.id_photo ; console.log("image" + data.id_photo) ; 
      return  this.categorieService.postCategories(this.categorie)}
       )).subscribe(data =>  {this.OpenSuccModal("Categorie ajoutée avec succès");
       this.categorie.nom = "" ,
       this.categorie.id_photo = ""})*/
  

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
