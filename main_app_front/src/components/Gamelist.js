import React, { useState, useEffect } from 'react';
import uuidv4 from 'uuid';

const axios = require('axios');

const Gamelist = ({ user }) => {

    const [gamelist, setgamelist] = useState([])
    const [Newgame, setNewgame] = useState('')
    useEffect(() => {
        axios.get('http://localhost:3050/')
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
    const ChangeHandler=(e)=>{setNewgame(e.target.value)}
    const sendNewGame=(event)=>{
        axios.post('http://localhost:3050/', {
           id:Newgame
          })
          .then(function (response) {
            if(response.data){
                axios.get('http://localhost:3050/')
            .then(function (response) {
                setgamelist(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
            }
            else{
                alert(`Gra o nazwie ${Newgame} już istnieje`)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      setNewgame('')
      event.preventDefault();


    }

    let view = gamelist.map((elem) => (<div key={uuidv4()} >  {elem} </div>))
    return (
        <div className="App">
            <h1>Create New Game</h1>
            <h3><form onSubmit={sendNewGame} >
                <label className="ChatForm">
                    New Game Name:
        <input type="text" value={Newgame} onChange={ChangeHandler} />
                </label>
                <input type="submit" value="Send" />
            </form> </h3>
            <h1 onClick={() => refresh()}>Game List</h1>
            {view}

        </div>
    )
}


export default Gamelist;