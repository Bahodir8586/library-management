import React from 'react';
import SweetAlert from "react-bootstrap-sweetalert";
import Spinner from "../loaders/spinner/spinner";
import UserProfile from "../shared/userProfile";

const UserModal = ({show, isLoading, isError, onConfirm, user}) => {
    const {id, image, username, fullName, onProcess, inDebt, finished} = user
    return (
        <SweetAlert
            show={show}
            title={isLoading ? "Loading..." : isError ? "Error" : id ? username : "User"}
            confirmBtnCssClass="px-6 py-3 bg-purple-600 text-white rounded text-xl cursor-pointer transition duration-200 hover:bg-purple-700"
            confirmBtnText="OK"
            onConfirm={onConfirm}
        >
            {isLoading ? <Spinner/> :
                isError ?
                    <div className={"text-red-600 font-medium"}>Something went wrong. Please try again later</div> :
                    <UserProfile image={image} username={username} fullName={fullName} onProcess={onProcess} finished={finished} inDebt={inDebt}/>
            }
        </SweetAlert>
    );
};

export default UserModal;
