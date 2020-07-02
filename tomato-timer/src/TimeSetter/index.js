import React, { useState, useEffect, useReducer } from 'react';
import './style.css';


function TimeSetter(props) {

    const { initTime, title, dispatch } = props;

    const high = Math.floor(initTime / 10);
    const low = initTime % 10;

    const [highNum, setHighNum] = useState(high);
    const [lowNum, setLowNum] = useState(low);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        setHighNum(high);
        setLowNum(low);
    }, [high, low]);

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

    const onEditButtonClick = () => {
        if (isEdit) {
            const currentTime = highNum * 10 + lowNum;
            if (currentTime === 0) {
                alert('无法设置为时间为0，请调整');
                return;
            }
            setIsEdit(false);
            dispatch({ type: 'set', count: currentTime });
        }
        else {
            setIsEdit(true);
        }
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
            <div className="timesetter-eidt-button" onClick={onEditButtonClick}>{isEdit ? '确认' : '编辑'}</div>
        </div>
    );
}

export default TimeSetter;