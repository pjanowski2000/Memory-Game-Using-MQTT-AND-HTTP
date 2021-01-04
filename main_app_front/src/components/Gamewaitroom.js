import React, { useState,useEffect } from 'react';
import Gameform from './Gameform.js';
import Chatroom from './Chatroom.js'
const axios = require('axios');

const mqtt = require('mqtt');
const Gamewaitroom = ({ name, usernick, type }) => {
  const [Started, isStarted] = useState(false)
  const [gamelist, setgamelist] = useState([])
  //tutaj sub na mqtt i start?
  //const waiters
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
    axios.get('http://localhost:3050/')
      .then(function (response) {
        setgamelist(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  let view = gamelist.map((elem)=>(<div>{elem}</div>))
  return (
    <div className="App">
      <header className="App-header">
        <h1>Waiting List {name}</h1>
        
        {view}
        <Chatroom room={`Game/${name}`} user={`${usernick}(${type})`} ></Chatroom>
      </header>
    </div>
  )

}

export default Gamewaitroom;