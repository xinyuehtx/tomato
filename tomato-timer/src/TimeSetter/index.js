import React, { useState, useEffect, useReducer } from 'react';
import './style.css';


function TimeSetter(props) {

    const { initTime, title, dispatch } = props;

    const [highNum, setHighNum] = useState(0);
    const [lowNum, setLowNum] = useState(0);

    useEffect(() => {
        const high = Math.floor(initTime / 10);
        const low = initTime % 10;
        setHighNum(high);
        setLowNum(low);
    }, [initTime]);

    const handleAddHigh = () => {
        setHighNum((num) => {
            return num < 9 ? num + 1 : 0;
        });
    }

    const handleMinusHigh = () => {
        setHighNum((num) => {
            return num > 0 ? num - 1 : 9;
        });
    }

    const handleAddLow = () => {
        setLowNum((num) => {
            return num < 9 ? num + 1 : 0;
        });
    }

    const handleMinusLow = () => {
        setLowNum((num) => {
            return num > 0 ? num - 1 : 9;
        });
    }


    return (
        <div className="timesetter-container">
            <div className="timersetter-title">{title}</div>
            <div className="timesetter-number-container">
                <div className="timesetter-button" onClick={handleAddHigh}>+</div>
                <div className="timesetter-number">{highNum}</div>
                <div className="timesetter-button" onClick={handleMinusHigh}>-</div>
            </div>
            <div className="timesetter-number-container">
                <div className="timesetter-button" onClick={handleAddLow}>+</div>
                <div className="timesetter-number">{lowNum}</div>
                <div className="timesetter-button" onClick={handleMinusLow}>-</div>
            </div>
            <div className="timesetter-unit">min</div>
        </div>
    );
}

export default TimeSetter;