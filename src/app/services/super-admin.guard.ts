import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
  constructor(private authService: UsersService, private route: Router){}

  canActivate(path: ActivatedRouteSnapshot ,
    state: RouterStateSnapshot): boolean {
  
      if (this.authService.isSuperAdmin())
      return true ; 
      else {this.route.navigate(["/categories"])
      return false }
  
  }
}
