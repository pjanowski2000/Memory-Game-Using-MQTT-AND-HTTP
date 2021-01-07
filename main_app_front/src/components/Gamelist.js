import React, { useState, useEffect } from 'react';
import uuidv4 from 'uuid';
import Gameroom from './Gameroom'
const axios = require('axios');

const Gamelist = ({ user }) => {

    const [gameselect, setgameselect] = useState(<div>foooooo</div>)
    const [select, setselect] = useState(false)
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
    const ChangeHandler = (e) => { setNewgame(e.target.value) }
    const sendNewGame = (event) => {
        axios.post('http://localhost:3050/', {
            id: Newgame
        })
            .then(function (response) {
                if (response.data) {
                    axios.get('http://localhost:3050/')
                        .then(function (response) {
                            setgamelist(response.data)
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
                else {
                    alert(`Gra o nazwie ${Newgame} już istnieje`)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        setNewgame('')
        event.preventDefault();


    }
    function handlegameselect1(e) {

        axios.post(`http://localhost:3050/${e}/newplayer`, {
            player: user
        })
        setgameselect(<Gameroom name={e} usernick={user} type={"gamer"}> </Gameroom>)
        setselect(true)
    }
    function handlegameselect2(e) {

        axios.post(`http://localhost:3050/${e}/newviewer`, {
            player: user
        })
        setgameselect(<Gameroom name={e} usernick={user} type={"viewer"}> </Gameroom>)
        setselect(true)
    }
    let view = gamelist.map((elem) => (<div key={uuidv4()}  >  {elem} <button onClick={() => handlegameselect1(elem)}>Join</button> <button onClick={() => handlegameselect2(elem)}>View</button></div>))

    if (select) {
        return (
            <div >
                {gameselect}
            </div>
        )
    }

    else {
        return (
            <div className="Gamelist">
                <h1>Create New Game</h1>
                <h3><form onSubmit={sendNewGame} >

                    <input type="text" value={Newgame} onChange={ChangeHandler} placeholder='New Game Name' />
                    <input type="submit" value="Add" />
                </form> </h3>
                <h1 onClick={() => refresh()}>Game List</h1>
                {view}

            </div>)
    }

}


export default Gamelist;