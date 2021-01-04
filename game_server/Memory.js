module.exports.Memory = class Memory {
  constructor() {
    this.tileCount = 12,
      this.tiles = [],
      this.tilesChecked = [],
      this.moveCount = 0,
      this.canGet = true,
      this.allpeople=[],
      this.players=[]  
  }
  addviewer(person){
    this.allpeople.push(person)
  }
  addplayer(person){
    this.players.push(person)
  }

  startGame() {
    this.tiles = [];
    this.tilesChecked = [];
    this.moveCount = 0;

    for (let i = 0; i < tileCount; i++) {
      this.tiles.push(i);
    }
    this.tiles.sort(() => Math.random() - 0.5)
  }
  tileClick(elem) {
    if (this.canGet) {
      if (!this.tilesChecked[0]) {
        this.tilesChecked.push(this.tiles[elem]);
        //wysłanie wartości tego elem do react???
      }
      if (this.tilesChecked.length === 2) {
        if (this.tilesChecked[0] === this.tilesChecked[1]) {
          //czeka i czyści kafelki
          setTimeout(() => this.deleteTiles(), 500);
        } else {
          //czeka i odwraca kafelki
          setTimeout(() => this.resetTiles(), 500);
        }
      }
    }
  }
  deleteTiles() {
    this.tilesChecked.forEach(el => {

    });

    this.canGet = true;
    this.tilesChecked = [];
  }
  resetTiles() {
    this.tilesChecked.forEach(el =>{} );
    this.tilesChecked = [];
    this.canGet = true;
  }
}


