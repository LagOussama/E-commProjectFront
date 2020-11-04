
import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MatDialogConfig, MatDialog} from '@angular/material';
import { UsersService } from '../services/users.service';
import { SignupComponent } from '../signup/signup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
user = {username: '' , password: '',type:'client',email:''};
errorLogin = false  ;
  constructor(private userservice: UsersService, private dialogRef: MatDialogRef<LoginComponent>, 
    private dialog: MatDialog , private route: Router) { }

  ngOnInit() {
  }

  login() {

    this.userservice.getUser(this.user).subscribe(
      data => this.handel(data) ,
      error => console.log(error)


    ) ;

  }
      handel(user) {

        console.log("user"+ user.token);
           localStorage.setItem('token', user.token);
           localStorage.setItem('role', user.type);
           localStorage.setItem('id', user.id);
        this.errorLogin = false ;
        this.dialogRef.close();
        
        

      }

      OpenSignupModal() {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
         dialogConfig.autoFocus = true;
    
          dialogConfig.width = '400px' ;
         dialogConfig.height = '400px' ;
    this.dialogRef.close();
    
        this.dialog.open(SignupComponent , dialogConfig);
      }
    

}