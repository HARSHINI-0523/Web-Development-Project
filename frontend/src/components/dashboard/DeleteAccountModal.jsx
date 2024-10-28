import React, { useEffect } from 'react';
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

    // Close modal on clicking outside or pressing Escape key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleOutsideClick = (event) => {
            if (event.target.classList.contains('modal-overlay')) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onClose]);

    return (
        <div className="deleteAccountmodal-overlay" aria-modal="true" role="dialog">
            <div className="deleteAccountmodal-content" aria-labelledby="modal-title">
                <h3 id="deleteAccountmodal-title">Delete Account</h3>
                <Lottie options={defaultOptions} height={150} width={150} />
                <p>Are you sure you want to delete your account? ArtFusion won’t be the same without you.</p>
                <div className="deleteAccountmodal-actions">
                    <button onClick={onClose} aria-label="Cancel delete">Cancel</button>
                    <button onClick={onConfirm} aria-label="Confirm delete">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
