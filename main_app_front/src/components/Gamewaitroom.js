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
  const [gamelist, setgamelist] = useState([])


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
        refresh()
      }
      if (wiadomosc === "refresh tiles") {
        console.log('resetuje kafelki');
        refresh_tiles()
      }
    });

  }, [Client])
  useEffect(() => {
    axios.get(`http://localhost:3050/${name}/allplayers`)
      .then(function (response) {
        setgamelist(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])
  function refresh() {
    axios.get(`http://localhost:3050/${name}/allplayers`)
      .then(function (response) {

        setgamelist(response.data)
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
      axios.get(`http://localhost:3050/${name}/start`)
        .then(function (response) {
          console.log('gra rozpoczeta');
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    else {
      alert('You arent gamer you cant play :(')
    }
  }
  function chosetile(index) {
    if (type === 'gamer') {
      console.log(Tiles[index]);
      if (Tiles[index] === 'X') {
        axios.post(`http://localhost:3050/${name}`, {
          number: index,
          player:  usernick
        })
          .then(function (response) {
            if(response.data){
              console.log('ok');
            }
            else{
              alert('To nie twoja tura')
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      }
      else {
        alert('You cant chose that tile you can only choose X tiles :(')
      }
    }
    else {
      alert('You arent gamer you cant play :(')
    }
  }
  let kafelki = Tiles.map((tile, index) => (<div key={uuidv4()} onClick={() => chosetile(index)} className='tile'>{tile}</div>))
  let view = gamelist.map((elem) => (<div key={elem}>{elem}</div>))

    return (
      <div >
        {Started ? <div> Start gry</div>     :   <button onClick={() => startgame()}>StartGame</button>}
        {Started ?  <div className='Tiles'>{kafelki} </div>    :   <h1 >Waiting List: {name}</h1>}
        
      
        {view}
        <Chatroom room={`Game/${name}`} user={`${usernick}(${type})`} ></Chatroom>

      </div>
    )
  }



export default Gamewaitroom;