import React, {useState} from 'react';
import Gameform from './Gameform.js';


const Gamewaitroom=({name,usernick,type})=> {
  //const [User,setUser]=useState('')
 //tutaj sub na mqtt i start?
 console.log(type);
    return(
    <div className="App">
    <header className="App-header">
    <h1>Wait Room {name}</h1>
    {usernick}  {type}
    </header>
    </div>
    )
  
}

export default Gamewaitroom;