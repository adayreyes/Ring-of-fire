import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player-dialog',
  templateUrl: './edit-player-dialog.component.html',
  styleUrls: ['./edit-player-dialog.component.scss']
})
export class EditPlayerDialogComponent implements OnInit {
  
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
  constructor(public dialogRef: MatDialogRef<EditPlayerDialogComponent>) { }

  ngOnInit(): void {
  }

}
