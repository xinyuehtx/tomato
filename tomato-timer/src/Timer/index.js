import React, { useState, useEffect } from 'react';
import './style.css';

const formatTime = (time) => {
    let minutes = Math.floor(time / 60).toString().padStart(2, 0);
    let seconds = (time % 60).toString().padStart(2, 0);

    return [minutes, seconds];
}

function Timer(props) {
    const { run, onTimeout } = props;
    const [remainTime, setRemainTime] = useState(() => 1 * 10);

    useEffect(() => {
        let interval;
        if (run) {
            interval = setInterval(() => {
                setRemainTime((r) => r - 1);

            }, 1000);
        }
        return () => { clearInterval(interval) };
    }, [run]);

    useEffect(() => {
        if (run && remainTime === 0) {
            onTimeout && onTimeout();
        }
    }, [run, remainTime, onTimeout]);

    const [minutes, seconds] = formatTime(remainTime);

    return (
        <div className="root">
            <div className="time">{`${minutes}:${seconds}`}</div>
        </div>
    );
}

export default Timer;