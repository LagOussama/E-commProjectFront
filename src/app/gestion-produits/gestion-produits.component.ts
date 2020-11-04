import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { GestionProduitsDataSource } from './gestion-produits-datasource';
import { ProduitsService } from '../services/produits.service';
import { AddProduitsComponent } from './add-produits/add-produits.component';
import { UpdateProduitsComponent } from './update-produits/update-produits.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-gestion-produits',
  templateUrl: './gestion-produits.component.html',
  styleUrls: ['./gestion-produits.component.css']
})
export class GestionProduitsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource = new MatTableDataSource<any>();

  constructor(private productService: ProduitsService, private dialog: MatDialog ){}
    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['id', 'designation','description', 'price' ,'productCategory_id','Modifier', 'Supprimer'];
  
    ngOnInit() {
      this.dataSource.sort = this.sort;
        this.productService.getAllProducts().subscribe(
          users => {
            this.dataSource.data = users.reverse();
          }
        );
      }


 openAddProduit() {
      const dialogRef = this.dialog.open(AddProduitsComponent, {
        width: "500px",
        height: "500px"
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.productService.getAllProducts().subscribe(
          Produits => {
            this.dataSource.data = Produits.reverse();
          },
  
          error => console.log(error),
          () => {
            console.log("completed");
          }
        );
      });
    }


    UpdateProduit(cat) {
      const dialogRef = this.dialog.open(UpdateProduitsComponent, {
        data: { data: cat }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.productService.getAllProducts().subscribe(
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



    deleteProduit(id) {
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
          this.productService.DeleteProducts(id).subscribe(result => {
            this.OpenSuccModal("produit supprimé avec succès");
  
            this.productService.getAllProducts().subscribe(
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
