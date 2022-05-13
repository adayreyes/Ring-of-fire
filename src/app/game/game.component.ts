import { Component, OnInit } from '@angular/core';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { Game } from '../models/game';
import {MatDialog} from '@angular/material/dialog';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  takeCardAnimation = false;
  currentCard: string | undefined = "";

  constructor(public dialog: MatDialog) { 
    this.game = new Game;
  }
 
  ngOnInit(): void {
    
  }
  
  

  showCard(){
    if(!this.takeCardAnimation && this.game.stack.length > 0){
      this.currentCard = this.game.stack.pop();
      this.takeCardAnimation = true;
      setTimeout(() => {
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.takeCardAnimation = false;
        this.game.playedCards.push(this.currentCard)
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);

    dialogRef.afterClosed().subscribe(name => {
      if(name && name.length > 0){
        this.game.players.push(name);
      }
    });
  }


}
