import React from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

const OrderDetailModal = ({show, onConfirm, order,returnBook, notUser}) => {
    const {id, book, librarian, wantedDate, givenDate, mustReturnDate, returnedDate, status} = order
    return (
        <SweetAlert
            show={show}
            title={`Order № ${id}`}
            confirmBtnCssClass="px-6 py-3 bg-purple-600 text-white rounded text-xl cursor-pointer transition duration-200 hover:bg-purple-700"
            confirmBtnText="OK"
            onConfirm={onConfirm}
        >
            <div className={"border-b pb-3"}>
                <div className={"px-4"}>
                    <div className={"flex text-left mb-2"}>
                        <div className={"w-full"}>Book name:</div>
                        <div className={"w-full font-medium"}>{book?.name}</div>
                    </div>
                    <div className={"flex text-left mb-2"}>
                        <div className={"w-full"}>Librarian name</div>
                        <div className={"w-full font-medium"}>{librarian?.name}</div>
                    </div>
                    <div className={"flex text-left mb-2"}>
                        <div className={"w-full"}>Book wanted date:</div>
                        <div className={"w-full font-medium"}>{wantedDate}</div>
                    </div>
                    <div className={"flex text-left mb-2"}>
                        <div className={"w-full"}>Book given date:</div>
                        <div
                            className={`w-full font-medium ${!givenDate && "text-red-600 "}`}>{givenDate ? givenDate : status === "denied" ? "This order is not accepted " : "Book is not given yet"}</div>
                    </div>
                    <div className={"flex text-left mb-2"}>
                        <div className={"w-full"}>Book should return date</div>
                        <div
                            className={`w-full font-medium ${!mustReturnDate && "text-red-600 "}`}>{order.mustReturnDate ? mustReturnDate : status === "denied" ? "This order is not accepted " : "Book is not given yet"}</div>
                    </div>
                    <div className={"flex text-left mb-2"}>
                        <div className={"w-full"}>Book returned date</div>
                        <div
                            className={`w-full font-medium ${!returnedDate && "text-red-600 "}`}>{returnedDate ? returnedDate : status === "denied" ? "This order is not accepted " : status === "waiting" ? "Book is not given yet" : "Book is not returned yet"}</div>
                    </div>
                    <div className={"flex text-left mb-2"}>
                        <div className={"w-full"}>Status</div>
                        <div className={"w-full font-medium capitalize"}>{status}</div>
                    </div>
                </div>
                {status !== "finished" && status !== "denied" && status !== "waiting" &&!notUser &&
                <div className={"mt-4"}>
                    <button
                        className={"px-6 py-3 bg-green-600 text-white rounded text-xl cursor-pointer transition duration-200 hover:bg-green-700"} onClick={()=>returnBook(id)}>Return
                        book
                    </button>
                </div>}
            </div>
        </SweetAlert>
    );
};

export default OrderDetailModal;

