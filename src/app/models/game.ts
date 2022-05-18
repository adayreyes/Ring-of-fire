/**
 * @class Game
 * Contains all the important information for the game
 */
export class Game{

    /**
     * Array for the players
     * @type {Array}
     */
    public players: string[] = [];

     /**
     * Array for the cards
     * @type {Array}
     */
    public stack: string[] = [];

     /**
     * Array for the played cards
     * @type {Array}
     */
    public playedCards: string[] | any = [];

    /**
    * Array for the profile images
    * @type {Array}
    */
    public playerImages: string[] = [];

    /**
     * Used to know the turns
     * @type {Number}
     */
    public currentPlayer: any = 0;

    /**
     * Used for the animation taking a card
     * @type {Boolean}
     */
    public takeCardAnimation = false;

    /**
     * Used to know, which is the current card
     * @type {String}
     */
    public currentCard: string | undefined = "";

    /**
     * Used to end the game
     * @type {Boolean}
     */
    public gameOver:boolean = false;

    /**
     * Used to restart the game
     * @type {Boolean}
     */
    public restarted:boolean = false;
    

    constructor(){
        this.addCardsToGame();
        shuffle(this.stack);
    }

    /**
     * Clean code function
     */
    addCardsToGame(){
        this.addCards("ace_");
        this.addCards("clubs_");
        this.addCards("diamonds_");
        this.addCards("hearts_");
      }
    
      
    /**
     * Adds the image paths to {@link Game#stack} from a suit.
     * @param suit Suit to add
     */
    addCards(suit:string){
      for(let i = 1; i < 14; i++){
        this.stack.push(suit + i)
      }
    }

    /**
     * Creates a json from {@link Game}
     * @returns Json
     */
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

    /**
     * Shuffles the values of an array.
     * Used to shuffle the stack.
     * @param array Array to shuffle
     * @returns {Array}
     */
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