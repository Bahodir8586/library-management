import React from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

const WarningModal = (props) => {
    return (
        <SweetAlert
            warning
            showCancel
            show={props.show}
            title={props.title}
            confirmBtnCssClass="px-6 py-3 border border-red-600 bg-red-600 text-white rounded text-xl cursor-pointer hover:bg-red-700 transition duration-200"
            confirmBtnText="DELETE"
            cancelBtnCssClass="px-6 py-3 border border-red-600 bg-white text-red-600 rounded text-xl cursor-pointer hover:bg-gray-100 transition duration-200"
            onConfirm={props.onConfirm}
            onCancel={props.onCancel}
        >
            {props.text}
        </SweetAlert>
    );
};

export default WarningModal;
