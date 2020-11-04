import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot , CanActivate, Router  } from '@angular/router';
import { Observable } from 'rxjs';

import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  

  constructor(private authService: UsersService, private route: Router){}

  canActivate(path: ActivatedRouteSnapshot ,
    state: RouterStateSnapshot): boolean {
  
        if (true /*this.authService.isLoggedIn()*/)
        return true ; 
        else {this.route.navigate(["/categories"])
        return false }
  
  }
}
