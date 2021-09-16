import React, {useEffect, useState} from 'react';
import Layout from "../../../components/layout";
import withAuth from "../../../HOCs/withAuth";
import EditBook from "../../../components/shared/editBook";
import {useRouter} from "next/router";
import axios from "../../../utils/axios";
import SuccessModal from "../../../components/modals/successModal";
import FailModal from "../../../components/modals/failModal";
import Spinner from "../../../components/loaders/spinner/spinner";

const Book = () => {
    const router = useRouter()
    const id = router.asPath.split("/")[3]
    const [data, setData] = useState({})
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [successText, setSuccessText] = useState("")
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [errorText, setErrorText] = useState("")
    const [showFailModal, setShowFailModal] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.get(`/admin/books/${id}`).then(response => {
            console.log(response)
            setData(response.data)
            setIsLoading(false)
        }).catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }, [router.asPath])

    const handleSubmit = (image, name, author, ISBN, publishedYear, description, count, selectedCategories) => {
        console.log(image, name, author, ISBN, publishedYear, description, count, selectedCategories)
        const submitData = new FormData();
        submitData.append("image", image);
        submitData.append("name", name);
        submitData.append("author", author);
        submitData.append("ISBN", ISBN);
        submitData.append("publishedYear", publishedYear);
        submitData.append("description", description);
        submitData.append("count", count)
        submitData.append("selectedCategories", JSON.stringify(selectedCategories))
        if(!name|| !author|| !ISBN|| !publishedYear|| !description|| !count|| !selectedCategories){
            setShowFailModal(true)
            setErrorText("Please fill all the fields")
            return
        }
        setIsLoading(true)
        axios.post(`/admin/books/${id}`, submitData).then(response => {
            console.log(response)
            setIsLoading(false)
            setSuccessText("Book information successfully edited")
            setShowSuccessModal(true)
        }).catch(error => {
            console.log(error)
            setIsLoading(false)
            setErrorText("Something went wrong. Please try again later")
            setShowFailModal(true)
        })
    }

    useEffect(() => {
        // get the list of all categories there
        setIsLoading(true)
        axios.get("/categories").then(response => {
            console.log(response)
            setCategories(response.data)
            setIsLoading(false)
        }).catch(error => {
            console.log(error)
            setIsLoading(false)
        })
    }, [])

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
            {isLoading ? <Spinner/> : <EditBook
                submit={(image, name, author, ISBN, publishedYear, description, count, selectedCategories) => handleSubmit(image, name, author, ISBN, publishedYear, description, count, selectedCategories)}
                book={data} categories={categories}/>}
        </Layout>
    );
};

export default withAuth(Book);
