import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  takeCardAnimation = false;
  currentCard: string | undefined = "";

  constructor() { 
    this.game = new Game;
    console.log(this.game)
  }
  
  ngOnInit(): void {
    
  }
  
  

  showCard(){
    if(!this.takeCardAnimation){
      this.currentCard = this.game.stack.pop();
      this.takeCardAnimation = true;
      setTimeout(() => {
        this.takeCardAnimation = false;
        this.game.playedCards.push(this.currentCard)
        console.log(this.game.playedCards)
      }, 1000);
    }
  }
}
