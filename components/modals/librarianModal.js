import React from 'react';
import SweetAlert from "react-bootstrap-sweetalert";
import Spinner from "../loaders/spinner/spinner";
import LibrarianProfile from "../user/librarianProfile";

const LibrarianModal = ({show, isLoading, isError, onConfirm, librarian}) => {
    const {id, image, name} = librarian
    return (
        <SweetAlert
            show={show}
            title={isLoading ? "Loading..." : isError ? "Error" : id ? `Librarian № ${id}` : "Librarian"}
            confirmBtnCssClass="px-6 py-3 bg-purple-600 text-white rounded text-xl cursor-pointer transition duration-200 hover:bg-purple-700"
            confirmBtnText="OK"
            onConfirm={onConfirm}
        >
            {/*{isLoading ? <Spinner/> : isError ?*/}
            {/*    <div className={"text-red-600 font-medium"}>Something went wrong. Please try again later</div> :*/}
            <LibrarianProfile image={image} name={name}/>
            {/*}*/}
            {/*    TODO: show avatar and so on */}
        </SweetAlert>
    );
};

export default LibrarianModal;
