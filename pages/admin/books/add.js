import React, {useState} from 'react';
import {useRouter} from "next/router";

import withAuth from "../../../HOCs/withAuth";
import axios from "../../../utils/axios";
import Layout from "../../../components/layout";
import AddBook from "../../../components/shared/addBook";
import SuccessModal from "../../../components/modals/successModal";
import Spinner from "../../../components/loaders/spinner/spinner";
import FailModal from "../../../components/modals/failModal";

export async function getStaticProps() {
    try {
        const res = await fetch("https://systemm-library.herokuapp.com/api/categories", {
            headers: {
                "Content-type": "application/json",
            }
        })
        const data = await res.json()
        console.log(data)
        return {props: {categories: [...data]}}
    } catch (e) {
        console.log(e)
        return {props: {categories: []}}
    }

}

const Add = ({categories}) => {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [successText, setSuccessText] = useState("")
    const [showFailModal, setShowFailModal] = useState(false)
    const [errorText, setErrorText] = useState("")

    const addBook = (image, name, author, ISBN, publishedYear, description, count, selectedCategories) => {
        if (!name || !author || !ISBN || !publishedYear || !image) {
            setShowFailModal(true)
            setErrorText("Please fill all required fields")
            return
        }
        if (count <= 0) {
            setShowFailModal(true)
            setErrorText("Number of books must be greater than 0")
            return
        }
        const today = new Date()
        if (publishedYear > today.getFullYear() || publishedYear < 1900) {
            setShowFailModal(true)
            setErrorText(`Published year should be between 1900 and ${today.getFullYear()}`)
            return
        }
        const submitData = new FormData();
        submitData.append("name", name);
        submitData.append("author", author);
        submitData.append("ISBN", ISBN);
        submitData.append("publishedYear", publishedYear);
        submitData.append("description", description);
        submitData.append("count", count);
        submitData.append("categories", JSON.stringify(selectedCategories));
        submitData.append("image", image)
        setIsLoading(true)
        axios.post(`/admin/books`, submitData).then(response => {
            console.log(response)
            setIsLoading(false)
            setSuccessText(`${name} book successfully added to database`)
            setShowSuccessModal(true)
        }).catch(error => {
            console.log(error)
            setIsLoading(false)
            setErrorText("Something went wrong. Please try again later")
            setShowFailModal(true)
            //	TODO: show different error messages
        })
    }

    return (
        <Layout>
            <SuccessModal show={showSuccessModal} title={"Congratulations"} onConfirm={() => {
                setShowSuccessModal(false)
                router.push("/admin/books");
            }} text={successText}/>
            <FailModal show={showFailModal} title={"Error"} onConfirm={() => {
                setErrorText("")
                setShowFailModal(false)
            }} text={errorText}/>
            {isLoading ? <Spinner/> :
                <AddBook categories={categories}
                         addBook={(image, name, author, ISBN, publishedYear, description, count, selectedCategories) =>
                             addBook(image, name, author, ISBN, publishedYear, description, count,
                                 selectedCategories)}/>}
        </Layout>
    );
};

export default withAuth(Add);
