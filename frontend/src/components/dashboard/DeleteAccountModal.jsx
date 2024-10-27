import React from 'react';
import './DeleteAccountModal.css';
import Lottie from 'react-lottie';
import DeleteAccount from '../../assets/Animations/DeleteAccount.json';

const DeleteAccountModal = ({ onClose, onConfirm }) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: DeleteAccount,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">

                <h3>Delete Account</h3>
                <Lottie
                    options={defaultOptions}
                    height={100}
                    width={100} />
                <p>Are you sure you want to delete your account? <strong>ArtFusion will not be same without you.</strong></p>
                <div className="modal-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
