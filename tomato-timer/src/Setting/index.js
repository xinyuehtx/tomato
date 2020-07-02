import React, { useContext } from 'react';
import './style.css';
import TimeSetter from '../TimeSetter/index';
import SettingContext from '../context';

function Setting(props) {
    const { workTime, workTimeDispatch, restTime, restTimeDispatch } = useContext(SettingContext);
    return (
        <div className="setting-container">
            <TimeSetter initTime={workTime} dispatch={workTimeDispatch} title='工作时间' />
            <TimeSetter initTime={restTime} dispatch={restTimeDispatch} title='休息时间' />
        </div>
    );
}

export default Setting;