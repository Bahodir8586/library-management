import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout";
import withAuth from "../../HOCs/withAuth";
import AdminProfile from "../../components/admin/adminProfile";
import axios from "../../utils/axios";
import SuccessModal from "../../components/modals/successModal";
import FailModal from "../../components/modals/failModal";

const Profile = () => {
    const [name, setName] = useState("Abdullayev Bahodir")
    const [categories, setCategories] = useState([])
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [successText, setSuccessText] = useState("")
    const [showFailModal, setShowFailModal] = useState(false)
    const [errorText, setErrorText] = useState("")

    const handleSubmit = (e, username, oldPassword, newPassword, confirmNewPassword) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setShowFailModal(true)
            setErrorText("Two passwords are not equal")
            return
        }
        if (newPassword.length < 6) {
            setShowFailModal(true)
            setErrorText("Password should contain at least 6characters")
            return
        }

        axios.patch(`/admin/`, {username, oldPassword, newPassword, confirmNewPassword}).then(response => {
            setShowSuccessModal(true)
            setSuccessText("Successfully updated")
        }).catch(error => {
            console.log(error)
            setShowFailModal(true)
            setErrorText("Something went wrong. Please try again later")
            //    TODO: show different error messages
        })
    }

    useEffect(() => {
        // getting the name of admin
        axios.get(`admin`).then(response => {
            console.log(response.data)
            setName(response.data)
        }).catch(error => {
            console.log(error)
        })
        // loading categories initially
        getCategories()
    }, [])

    const getCategories = () => {
        axios.get("/categories/").then(response => {
            console.log(response.data)
            setCategories(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const addCategory = (e, newCategory) => {
        e.preventDefault()
        console.log({name: newCategory})
        axios.post(`/admin/categories`, {name: newCategory}).then(response => {
            console.log(response.data)
            setSuccessText("New category successfully added")
            setShowSuccessModal(true)
            getCategories()
        }).catch((error) => {
            console.log(error)
            setShowFailModal(true)
            setErrorText("Something went wrong. Please try again later")
        })
    }

    const editCategory = (id, name) => {
        axios.patch(`admin/categories/${id}`, {name: name}).then(response => {
            console.log(response)
            setSuccessText("Category successfully edited")
            setShowSuccessModal(true)
            getCategories()
        }).catch(error => {
            console.log(error)
            setShowFailModal(true)
            setErrorText("Something went wrong. Please try again later")
        })
    }

    const deleteCategory = (id) => {
        axios.delete(`/admin/categories/${id}`).then(response => {
            console.log(response.data)
            setSuccessText("Category successfully deleted")
            setShowSuccessModal(true)
            getCategories()
        }).catch((error) => {
            console.log(error)
            setShowFailModal(true)
            setErrorText("Something went wrong. Please try again later")
        })
    }

    return (
        <Layout>
            <SuccessModal show={showSuccessModal} title={"Congratulations"} onConfirm={() => setShowSuccessModal(false)}
                          text={successText}/>
            <FailModal show={showFailModal} title={"Error"} onConfirm={() => setShowFailModal(false)} text={errorText}/>
            <AdminProfile name={name} categories={categories}
                          handleSubmit={(e, username, oldPassword, newPassword, confirmNewPassword) => handleSubmit(e,
                              username,
                              oldPassword,
                              newPassword,
                              confirmNewPassword)}
                          addCategory={(e, newCategory) => addCategory(e, newCategory)}
                          editCategory={(id, name) => editCategory(id, name)}
                          deleteCategory={(id) => deleteCategory(id)}/>
        </Layout>
    );
};

export default withAuth(Profile);
