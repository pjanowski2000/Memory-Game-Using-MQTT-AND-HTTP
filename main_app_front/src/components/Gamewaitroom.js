import React, {useState} from 'react';
import Gameform from './Gameform.js';


const Gamewaitroom=({name,usernick})=> {
  //const [User,setUser]=useState('')
 
    return(
    <div className="App">
    <header className="App-header">
    <h1>Wait Room {name}</h1>
    {usernick}
    </header>
    </div>
    )
  
}

export default Gamewaitroom;