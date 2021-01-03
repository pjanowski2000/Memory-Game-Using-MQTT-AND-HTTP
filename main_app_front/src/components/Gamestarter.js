import React, {useState} from 'react';
import Gameform from './Gameform.js';
import Gamelist from './Gamelist.js';

function Gamestarter() {
  const [User,setUser]=useState('')
  if (User===''){
  return (
    <div className="App">
    <header className="App-header">
    
    <Gameform User={setUser}> </Gameform>
    </header>
    </div>
  );
  }
  else{
    return(
    <div className="App">
    <header className="App-header">
    
    {User}
    <Gamelist user={User}> </Gamelist>
    </header>
    </div>
    )
  }
}

export default Gamestarter;