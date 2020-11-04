import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  message;
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
 
   this.message = data.message ;
  }
   ngOnInit() {
   }

}
