import React from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

const SuccessModal = (props) => {
    return (

            <SweetAlert
                success
                show={props.show}
                title={props.title}
                confirmBtnCssClass="px-6 py-3 bg-green-600 text-white rounded text-xl cursor-pointer transition duration-200 hover:bg-green-700"
                confirmBtnText="OK"
                onConfirm={props.onConfirm}
            >
                {props.text}
            </SweetAlert>
    );
};

export default SuccessModal;
