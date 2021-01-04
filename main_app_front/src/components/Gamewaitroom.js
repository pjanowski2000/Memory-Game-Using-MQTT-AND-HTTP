import React, {useState} from 'react';
import Gameform from './Gameform.js';
import Chatroom from './Chatroom.js'

const mqtt    = require('mqtt');
const Gamewaitroom=({name,usernick,type})=> {
  const [Started,isStarted]=useState(false)
 //tutaj sub na mqtt i start?
 //const waiters
 console.log(type);
    return(
    <div className="App">
    <header className="App-header">
    <h1>Waiting List {name}</h1>
    {`${usernick}(${type})`}
    <Chatroom room={`Game/${name}`} user={`${usernick}(${type})`} ></Chatroom>
    </header>
    </div>
    )
  
}

export default Gamewaitroom;