import React from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

const SuccessModal = (props) => {
    return (

            <SweetAlert
                success
                show={props.show}
                title={props.title}
                confirmBtnCssClass="px-6 py-3 bg-primaryGreen text-white rounded text-xl cursor-pointer"
                onConfirm={props.onConfirm}
            >
                {props.text}
            </SweetAlert>
    );
};

export default SuccessModal;
