export class Game{
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] | any = [];
    public currentPlayer: any = 0;
    public playerImages: string[] = []
    public takeCardAnimation = false;
    public currentCard: string | undefined = "";
    public gameOver:boolean = false;
    public restarted:boolean = false;
    

    constructor(){
        this.addCardsToGame();
        shuffle(this.stack);
    }

    addCardsToGame(){
        this.addCards("ace_");
        this.addCards("clubs_");
        this.addCards("diamonds_");
        this.addCards("hearts_");
      }
    
      addCards(suit:string){
        for(let i = 1; i < 14; i++){
          this.stack.push(suit + i)
        }
      }

      public toJson(){
        return {
          players: this.players,
          stack: this.stack,
          playedCards: this.playedCards,
          currentPlayer: this.currentPlayer,
          playerImages: this.playerImages,
          takeCardAnimation: this.takeCardAnimation,
          currentCard: this.currentCard,
          gameOver:this.gameOver,
          restarted:this.restarted
        }
      }

    }
    function shuffle(array:Array<string>) {
      let currentIndex = array.length,  randomIndex;
    
      // While there remain elements to shuffle.
      while (currentIndex != 0) {
    
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
    
      return array;
    }