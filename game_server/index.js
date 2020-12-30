

const express = require('express');
const app = express();
const cors = require('cors');
const port = 3050;
app.use(express.json());
let gamelist=[]
function findgame(id,type,number){
  let wyn=gamelist.findIndex(elem =>{return elem===id})
  if(wyn===-1){
    return "Podałeś zły numer gry :("
  }
  switch(type){
    case "GET":
      return boardlist[wyn].printBoard()
    case "POST":
      return boardlist[wyn].validate(number)
    case "DELETE":
      return boardlist[wyn].delete_move(number)
  }
}



app.get('/', (req, res) => {
  res.send("W tej chwili są takie gry o takim id: "+gamelist +"\n"+"Aby stworzyć nową grę podaj w POST id")
})
app.post('/', (req, res) => {
  if(gamelist.includes(req.body.id)){
    res.send("Istnie już gra o id: "+req.body.id+" !!!!!!!!!")
  } 
  res.send("Stworzono gre o id: "+req.body.id)
})

app.get('/:id', (req, res) => {
  res.send(findgame(req.params.id,"GET",0))
})

app.post('/:id', (req, res) => {
    res.send(findgame(req.params.id,"POST",req.body.number))
  })
  app.delete('/:id', (req, res) => {
      res.send(findgame(req.params.id,"DELETE",req.body.number))
    })
   
    
app.listen(3050, () => {
  console.log( 'Memory game app start listening at http://localhost:3050')
})
