import React, { useState } from 'react';
import Chatstarter from './Chatstarter.js'
import Gamestarter from "./Gamestarter.js";
const Selector = () => {
    const [Selector, setSelector] = useState('')
    function game() {
        setSelector('game')
    }
    function chat() {
        setSelector('chat')
    }
    if (Selector === '') {
        return (
            <div className="Choose">
                <div onClick={() => game()} className="selectors">Gra</div>
                <div onClick={() => chat()} className="selectors">Chat</div>
            </div>
        );
    }
    if (Selector === 'chat') {
        return (

            <Chatstarter></Chatstarter>

        )
    }
    if (Selector === 'game') {
        return (

            <Gamestarter> </Gamestarter>

        )
    }
}

export default Selector;