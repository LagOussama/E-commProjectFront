import {  Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { CommandesService } from '../services/commandes.service';

@Component({
  selector: 'app-commandes-table',
  templateUrl: './commandes-table.component.html',
  styleUrls: ['./commandes-table.component.css']
})
export class CommandesTableComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource = new MatTableDataSource<any>();

  constructor(private commandeService: CommandesService){

  }


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'orderState'];


  ngOnInit() {
  this.dataSource.sort = this.sort;
    this.commandeService.getAllcommandeForClient(localStorage.getItem("id")).subscribe(
      users => {console.log(users);
        this.dataSource.data = users.reverse();
        console.log(users);
      }
    );
  }


  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
 
