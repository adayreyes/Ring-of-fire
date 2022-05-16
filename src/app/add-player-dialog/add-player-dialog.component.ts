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

  images:Array<string> =[
    "profil1.png",
    "profil2.png",
    "profil3.png",
    "profil4.png"
    
  ]
 
  constructor(public dialogRef: MatDialogRef<AddPlayerDialogComponent>) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  } 

  selectImage(img:string){
    this.img = img;
  }
}
