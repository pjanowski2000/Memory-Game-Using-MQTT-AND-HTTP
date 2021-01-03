import React, { useState } from 'react';
import Gameform from './Gameform.js';
import Gamelist from './Gamelist.js';

function Gamestarter() {
    const [User, setUser] = useState('')
    if (User === '') {
        return (
            <Gameform User={setUser}> </Gameform>
        );
    }
    else {
        return (
            <Gamelist user={User}> </Gamelist>

        )
    }
}

export default Gamestarter;