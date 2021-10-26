import React, {useState} from 'react';
import {useRouter} from "next/router";

import withAuth from "../../../HOCs/withAuth";
import axios from "../../../utils/axios";
import Layout from "../../../components/layout";
import EditBook from "../../../components/shared/editBook";
import SuccessModal from "../../../components/modals/successModal";
import FailModal from "../../../components/modals/failModal";
import Spinner from "../../../components/loaders/spinner/spinner";

export async function getStaticPaths() {
    const res = await fetch('https://systemm-library.herokuapp.com/api/books', {
        headers: {
            "Content-type": "application/json",
        }
    })
    const json = await res.json()
    const books = json.data
    const paths = books?.map((book) => ({
        params: {id: book.id.toString()},
    }))
    return {paths, fallback: false}
}

export async function getStaticProps({params}) {
    try {
        const res = await fetch("https://systemm-library.herokuapp.com/api/categories", {
            headers: {
                "Content-type": "application/json",
            }
        })
        const categories = await res.json()
        const res2 = await fetch(`https://systemm-library.herokuapp.com/api/books/${params.id}`, {
            headers: {
                "Content-type": "application/json",
            }
        })
        const book = await res2.json()
        return {
            props: {
                categories: [...categories],
                book: {...book}
            }
        }
    } catch (e) {
        console.log(e)
        return {
            props: {
                categories: [],
                book: {}
            },
        }
    }
}

const Book = ({categories, book}) => {
    console.log(categories)
    console.log(book)
    const router = useRouter()
    const id = router.asPath.split("/")[3]
    const [isLoading, setIsLoading] = useState(false)
    const [successText, setSuccessText] = useState("")
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [errorText, setErrorText] = useState("")
    const [showFailModal, setShowFailModal] = useState(false)

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
        if (!name || !author || !ISBN || !publishedYear || !description || !count || !selectedCategories) {
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
                book={book} categories={categories}/>}
        </Layout>
    );
};

export default withAuth(Book);
