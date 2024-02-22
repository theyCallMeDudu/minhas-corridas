import React from "react";
import { createPortal } from "react-dom";
import './Modal.css';
import { BiX } from "react-icons/bi";

const portalRoot = document.getElementById('portal-root');

const UIModal = ({ children, isOpen, onClickClose }) => {
    if(!isOpen) {
        return null;
    }

    return createPortal(
        <div className="ui-modal__overlay">
            <div className="ui-modal">
                <button 
                    type="button" 
                    className="ui-modal__close-button"
                    onClick={onClickClose}
                >
                    <BiX className="close-icon"/>
                </button>
                {children}
            </div>
        </div>,
        portalRoot
    );
};

export default UIModal;