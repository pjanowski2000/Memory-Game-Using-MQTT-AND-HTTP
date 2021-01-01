import React, {useState,useEffect} from 'react';
import './App.css';
let mqtt    = require('mqtt');
let options = { clientId: 'service-3Kx03pKnM2',
connectTimeout: 5000,
hostname: '10.45.3.14',
port: 8000,
path: '/mqtt',
name: 'chat'
};
let client  = mqtt.connect(options);
client.subscribe('test');
function App() {
  
  const [Mesg, setMesg] = useState('czekam na coś')
  useEffect(() => {
    client.on('message', function (test, message) {
     let wiadomosc = message.toString();
      // Updates React state with message 
      setMesg(wiadomosc);
      console.log(wiadomosc);
      
      });
    
  }, [])
  
  
    
  return (
    <div className="App">
    <header className="App-header">
    <h1>Początek Projektu Czatu </h1>
        {Mesg}
        </header>
        </div>
  );
}

export default App;
