import {  Component, ViewChild, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';

import { CategoriesService } from '../services/categories.service';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { UpdateCategoriesComponent } from './update-categories/update-categories.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-gestion-categories',
  templateUrl: './gestion-categories.component.html',
  styleUrls: ['./gestion-categories.component.css'] 

})
export class GestionCategoriesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource = new MatTableDataSource<any>();

constructor(private categorieService: CategoriesService, private dialog: MatDialog){}
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'Modifier', 'Supprimer'];

  ngOnInit() {
    this.dataSource.sort = this.sort;
      this.categorieService.getAllCategories().subscribe(
        categories => {
          this.dataSource.data = categories.reverse();
        }
      );
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
  
    }


    openAddCategorie() {
      const dialogRef = this.dialog.open(AddCategoriesComponent, {
        width: "400px",
        height: "300px"
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.categorieService.getAllCategories().subscribe(
          categories => {
            this.dataSource.data = categories.reverse();
          },
  
          error => console.log(error),
          () => {
            console.log("completed");
          }
        );
      });
    }


    UpdateCategorie(cat) {
      const dialogRef = this.dialog.open(UpdateCategoriesComponent, {
        data: { data: cat }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.categorieService.getAllCategories().subscribe(
          users => {
            this.dataSource.data = users.reverse();
          },
  
          error => console.log(error),
          () => {
            console.log("completed");
          }
        );
      });
    }



    deleteCategorie(id) {
      this.confirmer("Êtes-vous sûr ?", id);
    }
  
    confirmer(msg, id) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
  
      dialogConfig.width = "300px";
      dialogConfig.height = "200px";
      dialogConfig.data = {
        message: msg
      };
  
      const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.categorieService.DeleteCategories(id).subscribe(result => {
            this.OpenSuccModal("Categorie supprimeé avec succès");
  
            this.categorieService.getAllCategories().subscribe(
              users => {
                this.dataSource.data = users.reverse();
              },
  
              error => console.log(error),
              () => {
                console.log("completed");
              }
            );
          });
        }
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
      }


  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
