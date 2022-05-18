import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() name:string | any; 
  @Input() img:string | any = "profile1.png"; 
  @Input() playerActive:boolean = false; 

  

  constructor(public addDialog: MatDialog,) { }

  ngOnInit(): void {
  }

  

}
