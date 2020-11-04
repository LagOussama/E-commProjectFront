import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  user = { name:'', firstName:'', phoneNumber:'', address:'', username:'', email:''};
    
    constructor(
      @Inject(MAT_DIALOG_DATA) public data,
        private usersService: UsersService ,
        private dialog: MatDialog,
        private UpdateDialog: MatDialogRef<UpdateUserComponent>
      ) {
      console.log(data.data);
    }
  
    ngOnInit() {
      this.user = this.data.data;
    
    }
  
    
    
    UpdateUser() {
      this.usersService.putUsers(this.user).subscribe(data => {
  
        this.OpenSuccModal('vous êtes enregistré avec succès');
  
      }) ;
  
  
  
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
