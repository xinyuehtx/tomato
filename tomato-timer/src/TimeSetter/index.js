import React, { useState, useEffect, useReducer } from 'react';
import './style.css';
import Modal from '../Modal';


function TimeSetter(props) {

    const { initTime, title, dispatch } = props;

    const high = Math.floor(initTime / 10);
    const low = initTime % 10;

    const [highNum, setHighNum] = useState(high);
    const [lowNum, setLowNum] = useState(low);
    const [isEdit, setIsEdit] = useState(false);
    const [isModalShown, setIsModalShown] = useState(false);


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
                setIsModalShown(true);
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
                <div className="timesetter-button-add" style={isEdit ? { visibility: 'visible' } : { visibility: 'hidden' }} onClick={handleAddHigh}></div>
                <div className="timesetter-number" style={isEdit ? null : { 'border-color': 'transparent' }}>{highNum}</div>
                <div className="timesetter-button-minus" style={isEdit ? { visibility: 'visible' } : { visibility: 'hidden' }} onClick={handleMinusHigh}></div>
            </div>
            <div className="timesetter-number-container">
                <div className="timesetter-button-add" style={isEdit ? { visibility: 'visible' } : { visibility: 'hidden' }} onClick={handleAddLow}></div>
                <div className="timesetter-number" style={isEdit ? null : { 'border-color': 'transparent' }}>{lowNum}</div>
                <div className="timesetter-button-minus" style={isEdit ? { visibility: 'visible' } : { visibility: 'hidden' }} onClick={handleMinusLow}></div>
            </div>
            <div className="timesetter-unit">min</div>
            <div className="timesetter-eidt-button" onClick={onEditButtonClick}>{isEdit ? '确认' : '编辑'}</div>
            <Modal message='无法设置为时间为0，请调整' isShown={isModalShown} onComfirm={() => setIsModalShown(false)} />
        </div>
    );
}

export default TimeSetter;