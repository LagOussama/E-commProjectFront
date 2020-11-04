import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CommandesService } from '../services/commandes.service';

@Component({
  selector: 'app-commandes-for-admin',
  templateUrl: './commandes-for-admin.component.html',
  styleUrls: ['./commandes-for-admin.component.scss']
})
export class CommandesForAdminComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource = new MatTableDataSource<any>();

  constructor(private commandeService: CommandesService){

  }


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'orderState'];


  ngOnInit() {
  this.dataSource.sort = this.sort;
    this.commandeService.Allcommandes().subscribe(
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
