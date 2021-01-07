import React, {useState} from 'react';
import Chatform from './Chatform.js';
import Chatroom from './Chatroom.js';

function Chatstarter() {
  const [User,setUser]=useState({name:''})
  const [Room,setRoom]=useState('')
  if (User.name===''){
  return (
    
    
    <Chatform User={setUser} Room={setRoom}></Chatform>
    
  );
  }
  else{
    return(
    
    
    <Chatroom user={User} room={Room}></Chatroom>
    
    )
  }
}

export default Chatstarter;