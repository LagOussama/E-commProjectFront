
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { UsersService } from '../services/users.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { AddUserComponent} from './add-user/add-user.component';
import { UpdateUserComponent} from './update-user/update-user.component';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.scss']
})
export class GestionUserComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource = new MatTableDataSource<any>();

  constructor(private userService: UsersService, private dialog: MatDialog ){}
    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['id', 'username','email', 'phoneNumber' ,'address','Modifier', 'Supprimer'];
  
    ngOnInit() {
      this.dataSource.sort = this.sort;
        this.userService.getUsers().subscribe(
          users => {
            this.handler(users)
          }
        );
      }
      handler(users){
        console.log(users)
        this.dataSource.data = users.reverse();
      }


 openAddProduit() {
      const dialogRef = this.dialog.open(AddUserComponent, {
        width: "500px",
        height: "500px"
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.userService.getUsers().subscribe(
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


    Updateuser(cat) {
      const dialogRef = this.dialog.open(UpdateUserComponent, {
        data: { data: cat }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.userService.getUsers().subscribe(
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



    deleteuser(id) {
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
          this.userService.DeleteUsers(id).subscribe(result => {
            this.OpenSuccModal("produit supprimé avec succès");
  
            this.userService.getUsers().subscribe(
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
