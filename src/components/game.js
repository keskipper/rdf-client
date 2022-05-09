import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Game(props) {
    let params = useParams();

    return (
        <div>Game: {params.gameId}</div>
    )
}

export default Game