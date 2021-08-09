import React from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

const WarningModal = (props) => {
    return (
        <SweetAlert
            warning
            showCancel
            show={props.show}
            title={props.title}
            confirmBtnCssClass="px-6 py-3 border border-primaryRed bg-primaryRed text-white rounded text-xl cursor-pointer"
            confirmBtnText="DELETE"
            cancelBtnCssClass="px-6 py-3 border border-primaryRed bg-white text-primaryRed rounded text-xl cursor-pointer"
            onConfirm={props.onConfirm}
            onCancel={props.onCancel}
        >
            {props.text}
        </SweetAlert>
    );
};

export default WarningModal;
