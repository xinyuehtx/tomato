import React, { useState, useEffect } from 'react';
import './style.css';
import { moment } from 'moment'

function Timer() {
    const [remainTime, setRemainTime] = useState(3000);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainTime((r) => r - 1);
        }, 1000);

        return ()=>{clearInterval(interval)};
    }, []);

    return (
        <div className="root">
            <div>{remainTime}</div>
        </div>
    );
}

export default Timer;