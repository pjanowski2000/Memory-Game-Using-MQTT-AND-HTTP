const MQTT = require("async-mqtt");

async function refresh_tile(game) {
  const client = await MQTT.connectAsync('ws://10.45.3.14:8000/mqtt');
  try {

    await client.publish(game, 'refresh tiles');

  } catch (e) {
    console.log(e.stack);
    process.exit();
  }
}

module.exports.Memory = class Memory {
  constructor() {
      this.actual_tiles=['X','X','X','X','X','X','X','X','X','X','X','X']
      this.tiles = [],
      this.tilesChecked = [],
      this.moveCount = 0,
      this.canGet = true,
      this.allpeople=[],
      this.players=[]
      this.player_number=0
      this.is_started=false

  }
  addviewer(person){
    this.allpeople.push(person)
  }
  actualplayer(){
   
    return  this.players[this.player_number]
  }
  addplayer(person){
    
    this.allpeople.push(person)
    this.players.push(person)
  }

  startGame() {
    this.is_started=true
    this.tiles = [];
    this.tilesChecked = [];
    this.moveCount = 0;

    for (let i = 1; i <= 6; i++) {
      this.tiles.push(i);
    }
    for (let i = 1; i <= 6; i++) {
      this.tiles.push(i);
    }
    this.tiles.sort(() => Math.random() - 0.5)
  }
  tileClick(elem,id) {
    if (this.canGet) {
      
        this.tilesChecked.push(this.tiles[elem]);
        this.actual_tiles[elem]=this.tiles[elem].toString();
        refresh_tile(id)
        
      
    
      if (this.tilesChecked.length === 2) {
        if(this.player_number+1===this.players.length){
          this.player_number=0
        }
        else{
          this.player_number+=1
        }
        if (this.tilesChecked[0] === this.tilesChecked[1]) {
          //czeka i czyści kafelki
          refresh_tile(id)
          setTimeout(() => this.deleteTiles(id), 500);
        } else {
          //czeka i odwraca kafelki
          refresh_tile(id)
          setTimeout(() => this.resetTiles(id), 500);
        }
      }
    }
  }
  deleteTiles(id) {
    this.actual_tiles=this.actual_tiles.map((elem)=>{
      if(elem !=='X' && elem !=='O'){
        elem='O'
      }
      return elem
    })

    this.canGet = true;
    this.tilesChecked = [];
    refresh_tile(id)
  }
  resetTiles(id) {
    this.actual_tiles=this.actual_tiles.map((elem)=>{
      if(elem !=='X' && elem !=='O'){
        elem='X'
      }
      return elem
    })
   
    this.tilesChecked = [];
    this.canGet = true;
    refresh_tile(id)
  }
  getTiles(){

    return this.actual_tiles
  }
}


