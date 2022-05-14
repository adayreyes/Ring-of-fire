export class Game{
    public players: string[] = [];
    public stack: string[] = [];
    public  playedCards: string[] | any = [];
    public currentPlayer: any = 0;

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