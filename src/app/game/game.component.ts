import { Component, OnInit } from '@angular/core';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { Game } from '../models/game';
import {MatDialog} from '@angular/material/dialog';
import { newArray } from '@angular/compiler/src/util';
import { Firestore, collectionData, collection, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { setDoc } from '@firebase/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  gameJson:any = {};
  takeCardAnimation = false;
  addPlayerFocus = false;
  currentCard: string | undefined = "";
  games$: Observable<any>;
  constructor(public dialog: MatDialog, private firestore: Firestore, public route: ActivatedRoute) { 
    this.game = new Game;
    const coll = collection(firestore, 'games');
    this.games$ = collectionData(coll);
  }
  
  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params)=>{
      const colli = collection(this.firestore,"games");
      console.log(colli)
    
    })
    
  }
  
  
  newGame(){
    this.gameJson = this.game.toJson();
  }

  showCard(){
    if(!this.takeCardAnimation && this.game.stack.length > 0 && this.game.players.length > 0){
      this.removeCardFromStack();
      setTimeout(() => {
        this.changePlayer();
        this.addToPlayedCards();
      }, 1000);
    } else if(this.game.players.length == 0){
      this.highlightButton();
    }
  }
  
  addToPlayedCards(){
    this.game.playedCards.push(this.currentCard)
    this.takeCardAnimation = false;
  }

  removeCardFromStack(){
    this.currentCard = this.game.stack.pop();
    this.takeCardAnimation = true;
  }

  changePlayer(){
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    document.getElementById(this.game.currentPlayer)?.scrollIntoView();
  }

  highlightButton(){
    this.addPlayerFocus = true
    console.log(this.addPlayerFocus)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);

    dialogRef.afterClosed().subscribe(name => {
      if(name && name.length > 0){
        this.game.players.push(name);
        this.addPlayerFocus = false;
      }
    });
  }


}
