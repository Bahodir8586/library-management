import React from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

const FailModal = ({show, title, onConfirm, text}) => {
    return (
        <SweetAlert
            danger
            show={show}
            title={title}
            confirmBtnCssClass="px-6 py-3 bg-red-600 text-white rounded text-xl cursor-pointer"
            onConfirm={onConfirm}
        >
            {text}
        </SweetAlert>
    );
};

export default FailModal;
