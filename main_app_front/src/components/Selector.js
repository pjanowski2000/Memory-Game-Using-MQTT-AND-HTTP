import React, { useState } from 'react';
import Chatstarter from './Chatstarter.js'
import Gamestarter from "./Gamestarter.js";
const Selector =()=>{
    const [Selector, setSelector] = useState('')
    function game() {
        setSelector('game')
    }
    function chat() {
        setSelector('chat')
    }
    if (Selector === '') {
        return (
            <div className="App">
                <div onClick={() => game()}>Gra</div>
                <div    onClick={() => chat()} >Chat</div>
            </div>
        );
    }
    if (Selector === 'chat') {
        return (
            <div className="App">
                <header className="App-header">
                <Chatstarter></Chatstarter>
                </header>
            </div>
        )
    }
    if (Selector === 'game') {
        return (
            <div className="App">
                <header className="App-header">
                <Gamestarter> </Gamestarter>
                </header>
            </div>
        )
    }
}

export default Selector;