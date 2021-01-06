
const MQTT = require("async-mqtt");



async function refresh(game) {
  const client = await MQTT.connectAsync("tcp:10.45.3.14:1883");
  try {

    await client.publish(game, 'refresh');

  } catch (e) {
    console.log(e.stack);
    process.exit();
  }
}




async function start(game) {
  const client = await MQTT.connectAsync('ws://10.45.3.14:8000/mqtt')
  try {

    await client.publish(game, 'start');

  } catch (e) {
    console.log(e.stack);
    process.exit();
  }
}
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3050;
const Memory = require('./Memory')
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
let boardlist = []
let gamelist = []
function findgame(id, type, person, number) {
  let wyn = gamelist.findIndex(elem => { return elem === id })
  if (wyn === -1) {
    return "Podałeś zły numer gry :("
  }
  switch (type) {
    case "SEE_ALL":
      let view = boardlist[wyn].allpeople.map(elem => {
        if (boardlist[wyn].players.includes(elem)) {
          return `${elem} (gamer)`
        }
        else {
          return `${elem} (viewer)`
        }

      })

      return view
    case "IS STARTED":
      return boardlist[wyn].is_started
    case "START":
      start(id)
      boardlist[wyn].startGame()
      return ''
    case "ADD_PLAYER":
      refresh(id)
      return boardlist[wyn].addplayer(person)
    case "ADD_VIEWER":
      refresh(id)
      return boardlist[wyn].addviewer(person)
    case "GET":
      return boardlist[wyn].getTiles()
      case "SCORE":
        let resultscore=[]
        
        for (let i=0;i<boardlist[wyn].players.length;i++){
            resultscore.push((`${boardlist[wyn].players[i]} ${boardlist[wyn].scoreboard[i]}`))
        }
        return resultscore
    case "POST":
      if (boardlist[wyn].actualplayer() === person) {
        boardlist[wyn].tileClick(number, id,person)
        return true
      }
      return false
    case "DELETE":
      return boardlist[wyn].delete_move(person)
  }
}



app.get('/', (req, res) => {
  res.send(gamelist)
})
app.post('/', (req, res) => {
  if (gamelist.includes(req.body.id)) {
    res.send(false)
  }
  else {
    gamelist.push(req.body.id)
    boardlist.push(new Memory.Memory())
    res.send(true)
  }
})
app.get('/:id', (req, res) => {
  res.send(findgame(req.params.id, "GET", 0))
})
app.get('/:id/isstarted', (req, res) => {
  res.send(findgame(req.params.id, "IS STARTED", 0))
})
app.post('/:id/newplayer', (req, res) => {
  res.send(findgame(req.params.id, "ADD_PLAYER", req.body.player))
})
app.post('/:id/newviewer', (req, res) => {
  res.send(findgame(req.params.id, "ADD_VIEWER", req.body.player))
})
app.get('/:id/allplayers', (req, res) => {
  res.send(findgame(req.params.id, "SEE_ALL"))
})
app.get('/:id/score', (req, res) => {
  res.send(findgame(req.params.id, "SCORE"))
})
app.get('/:id/start', (req, res) => {
  res.send(findgame(req.params.id, "START", req.body.player))
})

app.post('/:id', (req, res) => {
  res.send(findgame(req.params.id, "POST", req.body.player, req.body.number))
})
app.delete('/:id', (req, res) => {
  res.send(findgame(req.params.id, "DELETE", req.body.number))
})


app.listen(3050, () => {
  console.log('Memory game app start listening at http://localhost:3050')
})
