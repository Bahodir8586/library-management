import React, {useState} from 'react';
import {useRouter} from "next/router";

import withAuth from "../../../HOCs/withAuth";
import axios from "../../../utils/axios";
import Layout from "../../../components/layout";
import AddLibrarian from "../../../components/admin/addLibrarian";
import SuccessModal from "../../../components/modals/successModal";
import Spinner from "../../../components/loaders/spinner/spinner";
import FailModal from "../../../components/modals/failModal";

const Add = () => {
    const router = useRouter()
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [successText, setSuccessText] = useState("")
    const [showFailModal, setShowFailModal] = useState(false)
    const [errorText, setErrorText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = (e, username, fullName, password, image) => {
        e.preventDefault();
        console.log(username, fullName, password, image)
        const submitData = new FormData();
        if (!fullName || !username || !password) {
            setErrorText("Please fill all the fields")
            setShowFailModal(true)
            return;
        }
        if (password.length < 6) {
            setErrorText("Password should be at least 6characters")
            setShowFailModal(true)
            return;
        }
        submitData.append("fullName", fullName);
        submitData.append("username", username);
        submitData.append("password", password);
        submitData.append("image", image)
        setIsLoading(true)
        axios.post(`/admin/librarians`, submitData).then(response => {
            console.log(response)
            setShowSuccessModal(true)
            setSuccessText("New librarian successfully added")
            setIsLoading(false)
        }).catch(error => {
            console.log(error)
            setIsLoading(false)
            // TODO: show different messages for auth and not unique username
            setErrorText("Something went wrong. Please try again later")
            setShowFailModal(true)
        })
    }
    return (
        <Layout>
            <SuccessModal show={showSuccessModal} title={"Congratulations"} onConfirm={() => {
                setShowSuccessModal(false)
                router.push("/admin/librarians");
            }} text={successText}/>
            <FailModal show={showFailModal} title={"Error"} onConfirm={() => {
                setErrorText("")
                setShowFailModal(false)
            }} text={errorText}/>
            {isLoading ? <Spinner/> : <AddLibrarian
                handleSubmit={(e, username, fullName, password, image) => handleSubmit(e, username, fullName,
                    password, image)}/>}
        </Layout>
    );
};

export default withAuth(Add);
