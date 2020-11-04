import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  user = { name:'', firstName:'', phoneNumber:'', type:'admin', address:'', username:'',
  password:'', email:''};

constructor(private userservice: UsersService , private dialog: MatDialog , private router: Router
  , private dialogref: MatDialogRef<AddUserComponent>) { }

  ngOnInit() {
  }

  inscription() {
    this.user.type="admin";
    this.userservice.addUser(this.user).subscribe(data => {

      this.openModal('vous êtes enregistré avec succès');

    }) ;



  }



  openModal(msg) {
    const dialogConfig = new MatDialogConfig();
   dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

     dialogConfig.width = '300px' ;
    dialogConfig.height = '200px' ;
    dialogConfig.data = {
    message : msg
    };

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result =>
  this.dialogref.close()
    );
  }

}
