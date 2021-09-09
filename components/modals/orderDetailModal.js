import React from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

const OrderDetailModal = (props) => {
    console.log(props.order)
    return (
        <SweetAlert
            show={props.show}
            title={`Order № ${props.order.id}`}
            confirmBtnCssClass="px-6 py-3 bg-purple-600 text-white rounded text-xl cursor-pointer transition duration-200 hover:bg-purple-700"
            confirmBtnText="OK"
            onConfirm={props.onConfirm}
        >
            {/*    TODO: render the table there */}
        </SweetAlert>
    );
};

export default OrderDetailModal;

