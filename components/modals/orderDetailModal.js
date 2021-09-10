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
            {/*    TODO: clear props. Do with map method. Show exact messages for every status message */}
            <div className={"border-b pb-3"}>
                <div className={"px-4"}>
                    <div className={"flex text-left mb-2"}>
                        <div className={"w-full"}>Book name:</div>
                        <div className={"w-full font-medium"}>{props.order.book?.name}</div>
                    </div>
                    <div className={"flex text-left mb-2"}>
                        <div className={"w-full"}>Librarian name</div>
                        <div className={"w-full font-medium"}>{props.order.librarian?.name}</div>
                    </div>
                    <div className={"flex text-left mb-2"}>
                        <div className={"w-full"}>Book wanted date:</div>
                        <div className={"w-full font-medium"}>{props.order.wantedGetDate}</div>
                    </div>
                    <div className={"flex text-left mb-2"}>
                        <div className={"w-full"}>Book given date:</div>
                        <div
                            className={`w-full font-medium ${!props.order.givenDate && "text-red-600 "}`}>{props.order.givenDate ? props.order.givenDate : props.order.status === "denied" ? "This order is not accepted " : "Book is not given yet"}</div>
                    </div>
                    <div className={"flex text-left mb-2"}>
                        <div className={"w-full"}>Book should return date</div>
                        <div
                            className={`w-full font-medium ${!props.order.wantedReturnDate && "text-red-600 "}`}>{props.order.wantedReturnDate ? props.order.wantedReturnDate : props.order.status === "denied" ? "This order is not accepted " : "Book is not given yet"}</div>
                    </div>
                    <div className={"flex text-left mb-2"}>
                        <div className={"w-full"}>Book returned date</div>
                        <div
                            className={`w-full font-medium ${!props.order.returnedDate && "text-red-600 "}`}>{props.order.returnedDate ? props.order.returnedDate : props.order.status === "denied" ? "This order is not accepted " : props.order.status === "waiting" ? "Book is not given yet" : "Book is not returned yet"}</div>
                    </div>
                    <div className={"flex text-left mb-2"}>
                        <div className={"w-full"}>Status</div>
                        <div className={"w-full font-medium capitalize"}>{props.order.status}</div>
                    </div>
                </div>
                {props.order.status !== "finished" && props.order.status !== "denied" && props.order.status !== "waiting" &&
                <div className={"mt-4"}>
                    <button
                        className={"px-6 py-3 bg-green-600 text-white rounded text-xl cursor-pointer transition duration-200 hover:bg-green-700"}>Return
                        book
                    </button>
                </div>}
            </div>
        </SweetAlert>
    );
};

export default OrderDetailModal;

