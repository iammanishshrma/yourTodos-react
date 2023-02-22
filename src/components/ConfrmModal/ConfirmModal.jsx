import React from "react";

import "./ConfirmModal.css";

const ConfirmModal = (props) => {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2 className="modal__heading">
                    Are you sure you want to delete?
                </h2>
                <div className="modal__btn-wrap">
                    <button className="btn danger" onClick={props.onConfirm}>
                        Confirm
                    </button>
                    <button className="btn" onClick={props.onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
