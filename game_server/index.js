

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
let  boardlist=[]
let gamelist = []
function findgame(id, type, person, number) {
  let wyn = gamelist.findIndex(elem => { return elem === id })
  if (wyn === -1) {
    return "Podałeś zły numer gry :("
  }
  switch (type) {
    case "ADD_PLAYER":
      return boardlist[wyn].addplayer(person)
    case "ADD_VIEWER":
      return boardlist[wyn].addviewer(person)
    case "GET":
      return boardlist[wyn].getTiles()
    case "POST":
      boardlist[wyn].tileClick(number)
      return boardlist[wyn].getTiles()
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
app.post('/:id/newplayer', (req, res) => {
  res.send(findgame(req.params.id, "ADD_PLAYER", req.body.player))
})
app.post('/:id/newviewer', (req, res) => {
  res.send(findgame(req.params.id, "ADD_VIEWER", req.body.player))
})
app.post('/:id/start', (req, res) => {
  res.send(findgame(req.params.id, "START", req.body.player))
})
app.get('/:id', (req, res) => {
  res.send(findgame(req.params.id, "GET", 0))
})

app.post('/:id', (req, res) => {
  res.send(findgame(req.params.id, "POST", req.body.number,req.body.number))
})
app.delete('/:id', (req, res) => {
  res.send(findgame(req.params.id, "DELETE", req.body.number))
})


app.listen(3050, () => {
  console.log('Memory game app start listening at http://localhost:3050')
})
