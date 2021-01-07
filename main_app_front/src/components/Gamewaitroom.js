import React, { useState, useEffect } from 'react';
import Chatroom from './Chatroom.js'
import uuidv4 from 'uuid';
const axios = require('axios');
const mqtt = require('mqtt');
const Gamewaitroom = ({ name, usernick, type }) => {

  const mqtt = require('mqtt');
  const [Client, setClient] = useState(mqtt.connect('ws://10.45.3.14:8000/mqtt'));
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [Tiles, setTiles] = useState(['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'])
  const [Started, isStarted] = useState(false)
  const [playerlist, setplayerlist] = useState([])
  const [scorelist, setscorelist] = useState([])
  const [Question, setQuestion] = useState(false)
  // const [test, settest] = useState(initialState)
  //console.log(test);
  useEffect(() => {

    if (!connectionStatus) {
      setClient(mqtt.connect('ws://10.45.3.14:8000/mqtt'))
      setConnectionStatus(true)
    }

  }, [])
  useEffect(() => {
    if (name) {
      Client.subscribe(name)
    }

  }, [name])
  useEffect(() => {

    Client.on('message', function (topic, messag) {
      let wiadomosc = messag.toString();

      if (wiadomosc === "refresh") {
        console.log('reset');
        refresh()
      }
      if (wiadomosc === "start") {
        isStarted(true)
        refresh_tiles()
        score()
      }
      if (wiadomosc === "refresh tiles") {
        console.log('resetuje kafelki');
        refresh_tiles()
        score()
      }
      if (wiadomosc.startsWith('end,')) {
        console.log(wiadomosc);
        let winner = wiadomosc.split(',')
        alert(`Good Game The Winner is ${winner[1]}`)
        isStarted(false)
      }
      if (wiadomosc.endsWith('want to undo move')) {
        setQuestion(true)
       alert(wiadomosc)
      }
      if (wiadomosc.endsWith('want to start game')) {
        setQuestion(true)
       alert(wiadomosc)
      }
      
    });

  }, [Client])
  useEffect(() => {
    axios.get(`http://localhost:3050/${name}/allplayers`)
      .then(function (response) {
        setplayerlist(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])
  useEffect(() => {
    axios.get(`http://localhost:3050/${name}/isstarted`)
      .then(function (response) {

        isStarted(response.data)
        if (response.data) {
          refresh_tiles()
          score()
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])
  useEffect(() => {
    axios.get(`http://localhost:3050/${name}/allplayers`)
      .then(function (response) {
        setplayerlist(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])
  function refresh() {
    axios.get(`http://localhost:3050/${name}/allplayers`)
      .then(function (response) {

        setplayerlist(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  function refresh_tiles() {
    axios.get(`http://localhost:3050/${name}`)

      .then(function (response) {

        setTiles(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })

  }
  function startgame() {
    if (type === 'gamer') {
      axios.post(`http://localhost:3050/${name}/start`,{player: usernick})
        .then(function (response) {
          if(response.data){
            alert('Send question to all to start game')
          }
          else{
            alert('You cant start game')
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    else {
      alert('You arent gamer you cant play :(')
    }
  }
  function score() {
    axios.get(`http://localhost:3050/${name}/score`)

      .then(function (response) {

        setscorelist(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  function undomove() {
    axios.post(`http://localhost:3050/${name}/undo`,{player: usernick})
    .then(function (response) {
        if(response.data){
          alert('Send question to all to undo move')
        }
        else{
          alert('You cant undo move at this moment')
        }
      
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  function question_answear(elem) {
    if(Started){
      axios.post(`http://localhost:3050/${name}/undoanswear`,{player: usernick,answear:elem})
      .then(function (response) {
         alert(response.data)
        
      })
      .catch(function (error) {
        console.log(error);
      })
      setQuestion(false)
    }
    else{
      axios.post(`http://localhost:3050/${name}/startanswear`,{player: usernick,answear:elem})
      .then(function (response) {
         alert(response.data)
        
      })
      .catch(function (error) {
        console.log(error);
      })
      setQuestion(false)
    }
    }
   
  
  
  function chosetile(index) {
    if (type === 'gamer') {
      console.log(Tiles[index]);
      if (Tiles[index] === 'X') {
        axios.post(`http://localhost:3050/${name}`, {
          number: index,
          player: usernick
        })
          .then(function (response) {
            if (response.data) {
              console.log('ok');
            }
            else {
              alert('To nie twoja tura')
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      }
      else {
        alert('You cant choose that tile you can only choose X tiles :(')
      }
    }
    else {
      alert('You arent gamer you cant play :(')
    }
  }
  let kafelki = Tiles.map((tile, index) => (<div key={uuidv4()} onClick={() => chosetile(index)} className='tile'>{tile}</div>))
  let view = playerlist.map((elem) => (<div key={elem}>{elem}</div>))
  let boardlist = scorelist.map((elem) => (<div key={elem}>{elem}</div>))
  return (
    <div >
      {Started ? null : <button onClick={() => startgame()}>StartGame</button>}
      {Started ? <div>  Game {name} </div> : <h1 >Waiting Game {name} </h1>}
      {Question ? <div> <button onClick={() => question_answear(true)}>Yes</button> <button onClick={() => question_answear(false)}>No</button> </div>:null }
      {Started ? <div className='Tiles'>{kafelki} </div> : <div>{view}</div>}
      {Started ? <button onClick={() => undomove()}>Undo move</button> : null}
      {Started ? <div > Scoreboard </div> : null}
      {Started ? <div className='ScoreBoardList'> {boardlist} </div> : null}


      <Chatroom room={`Game/${name}`} user={`${usernick}(${type})`} ></Chatroom>

    </div>
  )
}



export default Gamewaitroom;