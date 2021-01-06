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
async function end_game(game, winner) {
  const client = await MQTT.connectAsync('ws://10.45.3.14:8000/mqtt');
  try {

    await client.publish(game, `end,${winner}`);

  } catch (e) {
    console.log(e.stack);
    process.exit();
  }
}

module.exports.Memory = class Memory {
  constructor() {
    //this.actual_tiles=['X','X','X','X','X','X','X','X','X','X','X','X']
    this.actual_tiles = []
    this.tiles = [],
      this.tilesChecked = [],
      this.moveCount = 0,
      this.canGet = true,
      this.allpeople = [],
      this.players = []
    this.scoreboard = []
    this.player_number = 0
    this.is_started = false
    this.want_undo = false
    this.undo_answears = []
  }
  addviewer(person) {
    this.allpeople.push(person)
  }
  addanswear(id,answear) {
    this.undo_answears.push(answear)
    if (this.undo_answears.length === this.players.length) {
      if (this.undo_answears.every(elem => elem === true)) {

        this.want_undo = false;
        this.resetTiles(id);
      }
      else {
        this.want_undo = false;

      }
      return 'All players decided';
    }
    return 'Wair for others to decide';
  }
  actualplayer() {

    return this.players[this.player_number]
  }
  addplayer(person) {

    this.allpeople.push(person)
    this.players.push(person)
    this.scoreboard.push(0)
  }

  startGame() {
    this.is_started = true
    this.tiles = [];
    this.tilesChecked = [];
    this.moveCount = 0;
    this.actual_tiles = [];
    for (let i = 1; i <= 3; i++) {
      this.tiles.push(i);
      this.actual_tiles.push('X');
    }
    for (let i = 1; i <= 3; i++) {
      this.tiles.push(i);
      this.actual_tiles.push('X');
    }
    this.tiles.sort(() => Math.random() - 0.5)
  }
  tileClick(elem, id, person) {
    if (this.canGet) {

      this.tilesChecked.push(this.tiles[elem]);
      this.actual_tiles[elem] = this.tiles[elem].toString();
      refresh_tile(id)



      if (this.tilesChecked.length === 2) {


        if (this.tilesChecked[0] === this.tilesChecked[1]) {

          this.scoreboard[this.player_number] += 1

          refresh_tile(id)
          setTimeout(() => this.deleteTiles(id), 500);
        } else {
          if (this.player_number + 1 === this.players.length) {
            this.player_number = 0
          }
          else {
            this.player_number += 1
          }
          refresh_tile(id)
          setTimeout(() => this.resetTiles(id), 500);
        }
      }
    }
  }
  deleteTiles(id) {
    this.actual_tiles = this.actual_tiles.map((elem) => {
      if (elem !== 'X' && elem !== 'O') {
        elem = 'O'
      }
      return elem
    })

    this.canGet = true;
    this.tilesChecked = [];
    console.log(this.actual_tiles);
    refresh_tile(id)

    const isO = (currentValue) => currentValue === 'O';

    if (this.actual_tiles.every(isO)) {
      this.is_started = false
      if (this.scoreboard.length != 1) {
        let max = Math.max(...this.scoreboard)
        let iswinner = (playerscore) => playerscore === max;
        let winnernumber = this.scoreboard.findIndex(iswinner)
        let winner = this.players[winnernumber]
        this.scoreboard = this.scoreboard.map((elem) => 0)
        end_game(id, winner)
      }
      else {
        this.scoreboard = this.scoreboard.map((elem) => 0)
        end_game(id, this.players[0])
      }

    }
  }
  resetTiles(id) {
    this.actual_tiles = this.actual_tiles.map((elem) => {
      if (elem !== 'X' && elem !== 'O') {
        elem = 'X'
      }
      return elem
    })

    this.tilesChecked = [];
    this.canGet = true;
    refresh_tile(id)

  }
  getTiles() {
    return this.actual_tiles
  }
}


