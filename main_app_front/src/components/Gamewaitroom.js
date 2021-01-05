import React, { useState, useEffect } from 'react';
import Chatroom from './Chatroom.js'
import uuidv4 from 'uuid';
const axios = require('axios');
const mqtt    = require('mqtt');
const Gamewaitroom = ({ name, usernick, type }) => {
  
  const mqtt = require('mqtt');
  const [Client, setClient] = useState(mqtt.connect('ws://10.45.3.14:8000/mqtt'));
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [Tiles, setTiles] = useState(['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'])
  const [Started, isStarted] = useState(false)
  const [gamelist, setgamelist] = useState([])
  
  //tutaj sub na mqtt i start?
  //const waiters
  useEffect(()=>{
    
    if(!connectionStatus){
    setClient(mqtt.connect('ws://10.45.3.14:8000/mqtt'))
    setConnectionStatus(true)
    }
  }, [])
  useEffect(()=>{
      if(name){
    Client.subscribe(name)
    }
    
  }, [name])
  useEffect(() => {
   
    Client.on('message', function (topic, messag) {
     let wiadomosc = messag.toString();
     
      if (wiadomosc==="refresh"){
        refresh()
      }
      if (wiadomosc==="refresh tiles"){
        refresh()
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
        setTiles(response.data)
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
  function startgame(){
    axios.get(`http://localhost:3050/${name}/start`)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  function chosetile(index){
    axios.post(`http://localhost:3050/${name}`,{
      number:index
    })
      .then(function (response) {
        setTiles(response)
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  let kafelki =Tiles.map((tile,index)=>(<div key={uuidv4()} onClick={()=>chosetile(index)}>{tile}</div>))
  let view = gamelist.map((elem) => (<div key={elem}>{elem}</div>))
  if (Started) {
    return (
      <div>
        

          Start gry
        {kafelki}
      </div>
    );
  }
  else {
    return (
      <div >
        <button onClick={()=>startgame()}>StartGame</button>
        <h1 onClick={() => refresh()}>Waiting List: {name}</h1>

        {view}
        <Chatroom room={`Game/${name}`} user={`${usernick}(${type})`} ></Chatroom>

      </div>
    )
  }

}

export default Gamewaitroom;