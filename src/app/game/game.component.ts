import { Component, Input, OnInit } from '@angular/core';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { Game } from '../models/game';
import {MatDialog} from '@angular/material/dialog';
import { Firestore, collectionData,addDoc, collection, doc, docData,setDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { EditPlayerDialogComponent } from '../edit-player-dialog/edit-player-dialog.component';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

/**
 * @class GameComponent
 */
export class GameComponent implements OnInit {
  /**
   * Game object @see {@link Game}
   * @type {Object}
   */
  game: Game;

  /**
   * Used to check if the game has been restarted
   * @type {Boolean}
   */
  restarted:boolean = false;

  /**
   * Used to highlight the add-player-button
   * @type {Boolean}
   */
  addPlayerFocus:boolean = false;

  /**
   * Used to save the route from the current game
   * @type {String}
   */
  gameId:string = "";

  /**
   * Used to check if the player has been logged
   * @type {Boolean}
   */
  playerLogged = false;

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
  
  /**
   * Checks if the game is over and set {@link GameComponent#restarted} and {@link Game#restarted} to false, so that they can be activated again.
   */
  checkGameOver(){
    if(this.game.gameOver){
      this.game.restarted = false;
      this.restarted = false;
    }
  }

  /**
   * Gets the game values from the server
   */
  getGame(){
    this.route.params.subscribe((params:any)=>{
      this.gameId = params.id;
      docData(doc(this.firestore,"games",this.gameId)).subscribe((game:any)=>{
        this.setGameValues(game);
    })
    })     
  }
  
  /**
   * Sets the values from the server to the current game
   * @param game @type {Object}
   */
  setGameValues(game:any){
    this.game.players = game.players;
      this.game.playedCards = game.playedCards;
      this.game.playerImages = game.playerImages;
      this.game.currentPlayer = game.currentPlayer;
      this.game.stack = game.stack;
      this.game.currentCard = game.currentCard;
      this.game.takeCardAnimation = game.takeCardAnimation;
      this.game.gameOver = game.gameOver;
      this.game.restarted = game.restarted;
  }
  
  /**#
   * Updates the values on the server
   */
  async saveGame(){
    const gameRef = doc(this.firestore,"games",this.gameId);
    await updateDoc(gameRef,this.game.toJson());
  }
  
  /**
   * Shows the complete animation of taking a card
   */
  showCard(){
    this.checkEnd();
    if(this.playerLogged && !this.game.takeCardAnimation && this.game.stack.length > 0 && this.game.players.length > 0){
      this.removeCardFromStack();
      setTimeout(() => {
        this.changePlayer();
        this.addToPlayedCards();
        this.saveGame();
      }, 1000);
    }
    else if(!this.playerLogged){
      this.highlightButton();
    }
  }
  
  /**
   * Checks if there are more cards. If don't, sets {@link Game#gameOver} to false.
   */
  checkEnd(){
    if(this.game.stack.length == 0){
      this.game.gameOver = true;
      this.saveGame()
    }
  }
  
  /**
   * Checks if the game has been restarted
   */
  checkRestarted(){
    if(this.game.restarted === true && this.restarted === false){
      this.playerLogged = false;
      this.restarted = true
    }
  }
  
  /**
   * Adds the last played to the array {@link Game#playedCards}
   */
  addToPlayedCards(){
    this.game.playedCards.push(this.game.currentCard)
    this.game.takeCardAnimation = false;
  }
  
  /**
   * Removes the last card from the stack.
   */
  removeCardFromStack(){
    this.game.currentCard = this.game.stack.pop();
    this.game.takeCardAnimation = true;
    this.saveGame();
    
  }
  
  /**
   * Changes the player after taking a card
   */
  changePlayer(){
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    document.getElementById(this.game.currentPlayer)?.scrollIntoView();
    
  }
  
  /**
   * Used for the highlight animation.
   */
  highlightButton(){
    this.addPlayerFocus = true
  }

  /**
   * Opens a dialog to add a new player
   */
  addPlayer(): void {
    const dialogRef = this.addDialog.open(AddPlayerDialogComponent);
    dialogRef.afterClosed().subscribe(name => {
      if(name && name.length > 0){
        this.game.players.push(name);
        this.game.playerImages.push("profile1.png");
        this.playerLogged = true;
        this.addPlayerFocus = false;
        this.saveGame();
      }
    });
  }

  /**
   * Opens a dialog to edit the image of the player or delete him.
   * @param player index from player
   */
  editPlayer(player:number){
    const dialogRef = this.addDialog.open(EditPlayerDialogComponent);
    dialogRef.afterClosed().subscribe(change => {
      if(change === "DELETE"){
        this.game.players.splice(player,1);
        this.game.playerImages.splice(player,1);
      } 
      else if(change){
        this.game.playerImages.splice(player,1,change);
      }
      this.saveGame();
    });
  }
  
  /**
   * Opens the dialog to share the link.
   */
  openShareDialog(): void{
    const dialogRef = this.shareDialog.open(ShareDialogComponent);
  }
  
  /**
   * Starts a new game and save it on the server
   */
  startNewGame(){
    this.restartGameValues();
    this.saveGame();
  }
  
  /**
   * Restarts all values from {@link Game}
   */
  restartGameValues(){
    this.game.players = [];
    this.game.playedCards = [];
    this.game.stack = [];
    this.game.playerImages = [];
    this.playerLogged = false;
    this.game.takeCardAnimation = false;
    this.game.currentCard = "";
    this.game.currentPlayer = 0;
    this.game.addCardsToGame();
    this.game.gameOver = false;
    this.game.restarted = true;
  }
  
  /**
   * Delete a player
   * @param index index of the player
   */
  deletePlayer(index:number){
    this.game.players.splice(index,1);
    this.saveGame();
  }
}
