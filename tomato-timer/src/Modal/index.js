import React from 'react';
import './style.css';

function Modal(props) {
    const { isShown, message, onComfirm, onOutsideClick } = props;
    console.log(isShown)
    return (
        <div className={`${'modal-container'} ${isShown && 'modal-container-active'}`} onClick={onOutsideClick}   >
            <div >{message}</div>
            <div onClick={onComfirm} >确定</div>
        </div>
    );
}

export default Modal;