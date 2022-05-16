import { Component, Input, OnInit } from '@angular/core';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { Game } from '../models/game';
import {MatDialog} from '@angular/material/dialog';
import { Firestore, collectionData,addDoc, collection, doc, docData,setDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  
  game: Game;
  restarted:boolean = false;
  addPlayerFocus:boolean = false;
  gameId:string = "";
  playerLogged = false;
  images:Array<string> =[
    "profil1.png",
    "profil2.png",
    "profil3.png",
    "profil4.png"
    
  ]

  constructor(public addDialog: MatDialog, public shareDialog: MatDialog, private firestore: Firestore, public route: ActivatedRoute) { 
    this.game = new Game;
  }
  
  ngOnInit(): void {

    this.getGame();
    let interval = setInterval(()=>{
      this.checkRestarted();
      this.checkGameOver();
    },200)
    
  }
  
  checkGameOver(){
    if(this.game.gameOver){
      this.game.restarted = false;
      this.restarted = false;
    }
  }

  getGame(){
    this.route.params.subscribe((params:any)=>{
      this.gameId = params.id;
      docData(doc(this.firestore,"games",this.gameId)).subscribe((game:any)=>{
        this.setGameValues(game);
    })
    })     
  }

  setGameValues(game:any){
    this.game.players = game.players;
      this.game.playedCards = game.playedCards;
      this.game.currentPlayer = game.currentPlayer;
      this.game.stack = game.stack;
      this.game.currentCard = game.currentCard;
      this.game.takeCardAnimation = game.takeCardAnimation;
      this.game.gameOver = game.gameOver;
      this.game.restarted = game.restarted;
  }
  
  async saveGame(){
    const gameRef = doc(this.firestore,"games",this.gameId);
    await updateDoc(gameRef,this.game.toJson());
  }
  
  showCard(){
    this.checkEnd();
    if(this.playerLogged && !this.game.takeCardAnimation && this.game.stack.length > 0 && this.game.players.length > 0){
      this.removeCardFromStack();
      setTimeout(() => {
        this.changePlayer();
        this.addToPlayedCards();
      }, 1000);
    }
    else if(!this.playerLogged){
      this.highlightButton();
    } 
    console.log(this.game.players);
    
  }

  checkEnd(){
    if(this.game.stack.length == 0){
      this.game.gameOver = true;
      this.saveGame()
    }
  }
 
  checkRestarted(){
    if(this.game.restarted === true && this.restarted === false){
      this.playerLogged = false;
      this.restarted = true
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
  }

  openAddPlayerDialog(): void {
    const dialogRef = this.addDialog.open(AddPlayerDialogComponent);
    dialogRef.afterClosed().subscribe(name => {
      if(name && name.length > 0){
        this.game.players.push(name);
        this.playerLogged = true;
        this.addPlayerFocus = false;
        this.saveGame();
      }
    });
  }
  
  openShareDialog(): void{
    const dialogRef = this.shareDialog.open(ShareDialogComponent);
  }
  
  startNewGame(){
    this.restartGameValues();
    this.saveGame();
  }
  
  restartGameValues(){
    this.game.players = [];
    this.game.playedCards = [];
    this.game.stack = [];
    this.playerLogged = false;
    this.game.takeCardAnimation = false;
    this.game.currentCard = "";
    this.game.currentPlayer = 0;
    this.game.addCardsToGame();
    this.game.gameOver = false;
    this.game.restarted = true;
  }
  
  
  deletePlayer(index:number){
    this.game.players.splice(index,1);
    this.saveGame();
  }
}
