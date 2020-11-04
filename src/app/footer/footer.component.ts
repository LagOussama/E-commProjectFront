import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
nbr=0 ;
  constructor(public userservice: UsersService, private panierService: PanierService) { }

  ngOnInit() {
    if (localStorage.getItem("products")) {
      this.nbr = JSON.parse(localStorage.getItem("products")).length;
      }
      this.panierService.getPanier().subscribe(
        nbr => this.nbr = nbr
      )
  
    }


}
