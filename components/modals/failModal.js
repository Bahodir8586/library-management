import React from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

const FailModal = (props) => {
    return (
        <SweetAlert
            danger
            show={props.show}
            title={props.title}
            confirmBtnCssClass="px-6 py-3 bg-red-600 text-white rounded text-xl cursor-pointer"
            onConfirm={props.onConfirm}
        >
            {props.text}
        </SweetAlert>
    );
};

export default FailModal;
