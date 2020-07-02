import React, { useState, useEffect } from 'react';
import './style.css';
import TimeSetter from '../TimeSetter/index';

function Setting(props) {
    return (
        <div className="setting-container">
            <TimeSetter initTime={25} title='工作时间' />
            <TimeSetter initTime={5} title='休息时间' />
        </div>
    );
}

export default Setting;