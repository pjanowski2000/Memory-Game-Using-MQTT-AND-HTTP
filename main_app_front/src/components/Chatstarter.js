import React, {useState} from 'react';
import Chatform from './Chatform.js';
import Chatroom from './Chatroom.js';

function Chatstarter() {
  const [User,setUser]=useState({name:''})
  const [Room,setRoom]=useState('')
  if (User.name===''){
  return (
    <div className="App">
    <header className="App-header">
    
    <Chatform User={setUser} Room={setRoom}></Chatform>
    </header>
    </div>
  );
  }
  else{
    return(
    <div className="App">
    <header className="App-header">
    
    <Chatroom user={User} room={Room}></Chatroom>
    </header>
    </div>
    )
  }
}

export default Chatstarter;