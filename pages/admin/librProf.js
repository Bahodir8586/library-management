import React, {useState} from 'react';
import Layout from "../../components/layout";
import withAuth from "../../HOCs/withAuth";
import LibrarianProfile from "../../components/librarian/librarianProfile";
import SuccessModal from "../../components/modals/successModal";
import FailModal from "../../components/modals/failModal";

const Profile = () => {
    const data = {
        username: "Username",
        fullName: "Full Name",
        image:""
    }
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [successText, setSuccessText] = useState("")
    const [showFailModal, setShowFailModal] = useState(false)
    const [errorText, setErrorText] = useState("")

    const handleSubmit=(username, fullName, image, imgSrc, oldPassword, newPassword, confirmNewPassword)=>{

    }

    return (
        <Layout>
            <SuccessModal show={showSuccessModal} title={"Congratulations"} onConfirm={() => setShowSuccessModal(false)}
                          text={successText}/>
            <FailModal show={showFailModal} title={"Error"} onConfirm={() => setShowFailModal(false)} text={errorText}/>
            <LibrarianProfile
                handleSubmit={(username, fullName, image, imgSrc, oldPassword, newPassword, confirmNewPassword) => handleSubmit(username, fullName, image, imgSrc, oldPassword, newPassword, confirmNewPassword)}
                data={data}/>
        </Layout>
    );
};

export default withAuth(Profile);
