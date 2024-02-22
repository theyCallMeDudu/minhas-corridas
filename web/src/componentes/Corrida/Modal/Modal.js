import UIModal from "../../UI/Modal/Modal";
import './Modal.css';

const CorridaModal = ({ isOpen, onClickClose, children }) => {
    return (
        <UIModal 
            isOpen={isOpen} 
            onClickClose={onClickClose}>
                {children}
        </UIModal>
    );
}

export default CorridaModal;