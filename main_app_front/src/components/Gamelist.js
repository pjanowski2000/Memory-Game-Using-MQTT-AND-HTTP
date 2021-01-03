import React, { useState } from 'react';
const Gamelist =({user})=>{
    
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