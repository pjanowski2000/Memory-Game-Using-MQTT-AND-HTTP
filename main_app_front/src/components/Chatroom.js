import React,{useEffect,useState} from 'react';
import uuidv4 from 'uuid';
 const mqtt    = require('mqtt');
const Chatroom=({room,user}) => {
  
 
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [messages, setMessages] = useState([]);
  const [recivedMessage,setRecivedMessage]=useState( `${user} Przywitaj się !!!`)
  const [NewMessage,setNewMessage] =useState('');
  const [Client, setClient] = useState(mqtt.connect('ws://10.45.3.14:8000/mqtt'));
  useEffect(()=>{
    
    if(!connectionStatus){
    setClient(mqtt.connect('ws://10.45.3.14:8000/mqtt'))
    setConnectionStatus(true)
    }
  }, [])
  useEffect(()=>{
      if(room){
    Client.subscribe(room)
    }
    
  }, [room])
  
 
  useEffect(() => {
   
    Client.on('message', function (topic, messag) {
     const wiadomosc = messag.toString();
      setRecivedMessage(wiadomosc);    
      });
      
  }, [Client])
  useEffect(() => {
   setMessages(prevState => [...prevState,recivedMessage])
      
  }, [recivedMessage])
  let view=messages.map( (elem) =>( <div key={uuidv4()} >  {elem} </div>))
 
    const ChangeHandler=(e)=>{setNewMessage(e.target.value)}
    const sendMessage=(event)=>{
      Client.publish(room.toString(),user+': '+NewMessage)
      setNewMessage('')
      event.preventDefault();


    }
    
  return (
    <div className="Chatroom">
    
    <h1 className="title"> Chat in room:   {room} </h1>
        <h3>{view}</h3>
        <h3><form onSubmit={sendMessage} >
        <label className="ChatForm">
        Message:
        <input type="text" value={NewMessage} onChange={ChangeHandler} />
          </label>
          <input type="submit" value="Send" />
        </form> </h3>
       
        </div>
  );
}
export default Chatroom;