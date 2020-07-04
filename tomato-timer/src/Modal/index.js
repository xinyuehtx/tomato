import React from 'react';
import './style.css';

function Modal(props) {
    const { isShown, message, onComfirm, onOutsideClick } = props;
    console.log(isShown)
    return (
        <div className={`${'modal-container'} ${isShown && 'modal-container-active'}`} onClick={onOutsideClick}   >
            <div className='modal-view'>
                <div className='modal-message'>{message}</div>
                <button className='modal-comfirm-button' type='button' onClick={onComfirm} >确定</button>
            </div>
        </div>
    );
}

export default Modal;