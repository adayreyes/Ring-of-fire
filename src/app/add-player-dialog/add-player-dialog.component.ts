import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.scss']
})
export class AddPlayerDialogComponent implements OnInit {

  name:string = "";
  img:string="";

  /**
   * Array with all profile images
   * @type {Array}
   */
  allProfileImages:Array<string> =[
    "profile1.png",
    "profile2.png",
    "profile3.png",
    "profile4.png"
    
  ]
 
  constructor(public dialogRef: MatDialogRef<AddPlayerDialogComponent>) { }

  ngOnInit(): void {
  }

  /**
   * Closes the dialog
   */
  onNoClick(): void {
    this.dialogRef.close();
  } 

}
