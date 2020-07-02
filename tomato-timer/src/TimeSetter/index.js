import React, { useState, useEffect, useReducer } from 'react';
import './style.css';

const reducer = (state, action) => {
    switch (action.type) {
        case 'addOne': return state + 1;
        case 'addTen': return state + 10;
        default: throw new Error('Unexpected action');
    }
}

function TimeSetter(props) {

    const { initTime, title, dispatch } = props;

    const [currentTime, currentTimeDispatch] = useReducer(reducer, initTime);

    const high = Math.floor(currentTime / 10);
    const low = currentTime % 10;

    return (
        <div className="timesetter-container">
            <div className="timersetter-title">{title}</div>
            <div className="timesetter-number-container">
                {high}
            </div>
            <div className="timesetter-number-container">
                {low}
            </div>
            <div className="timesetter-unit">min</div>
        </div>
    );
}

export default TimeSetter;