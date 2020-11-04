import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatBadgeModule, MatGridListModule, MatSelectModule,MatDialogModule, MatFormFieldModule} from '@angular/material';

import {MatCardModule} from '@angular/material/card';

import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [],
  exports: [
    CommonModule ,
    MatToolbarModule, 
    MatButtonModule,
     MatSidenavModule, 
     MatIconModule, 
     MatListModule ,
    MatCardModule ,
    MatBadgeModule, 
    MatGridListModule ,
 MatFormFieldModule ,
 
    MatSelectModule,
    MatDialogModule,

  ] 
})
export class MyMaterialModule { }
