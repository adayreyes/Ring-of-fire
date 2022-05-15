import { Component, OnInit } from '@angular/core';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { Game } from '../models/game';
import {MatDialog} from '@angular/material/dialog';
import { newArray } from '@angular/compiler/src/util';
import { Firestore, collectionData,addDoc, collection, doc, docData,setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { query } from '@firebase/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game;
  addPlayerFocus:boolean = false;
  gameId:string = "";
  playerLogged = false;

  constructor(public dialog: MatDialog, private firestore: Firestore, public route: ActivatedRoute) { 
    this.game = new Game;
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((params:any)=>{
      this.gameId = params.id;
      docData(doc(this.firestore,"games",this.gameId)).subscribe((game:any)=>{
      this.game.players = game.players;
      this.game.playedCards = game.playedCards;
      this.game.currentPlayer = game.currentPlayer;
      this.game.stack = game.stack;
      this.game.currentCard = game.currentCard;
      this.game.takeCardAnimation = game.takeCardAnimation;
    })
    })    
  }
  
  
  saveGame(){
    const gameRef = doc(this.firestore,"games",this.gameId);
    updateDoc(gameRef,this.game.toJson());
  }
  


  showCard(){
    if(this.playerLogged && !this.game.takeCardAnimation && this.game.stack.length > 0){
      this.removeCardFromStack();
      setTimeout(() => {
        this.changePlayer();
        this.addToPlayedCards();
      }, 1000);
    } else if(!this.playerLogged){
      this.highlightButton();
    }
  }
  
  addToPlayedCards(){
    this.game.playedCards.push(this.game.currentCard)
    this.game.takeCardAnimation = false;
    this.saveGame();
  }
  
  removeCardFromStack(){
    this.game.currentCard = this.game.stack.pop();
    this.game.takeCardAnimation = true;
    this.saveGame();
  }
  
  changePlayer(){
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    document.getElementById(this.game.currentPlayer)?.scrollIntoView();
    this.saveGame();
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
        this.playerLogged = true;
        this.addPlayerFocus = false;
        this.saveGame();
      }
    });
  }


}
