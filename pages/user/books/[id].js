import React from 'react';
import Layout from "../../../components/layout";
import withAuth from "../../../HOCs/withAuth";
import Book from "../../../components/user/book";
import axios from "../../../utils/axios";

//TODO: get information there statically
export async function getStaticPaths() {
    const res = await fetch('https://systemm-library.herokuapp.com/api/admin/books', {
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer 8|zGQOjpIyrSaGNRREOtPfH5aZjcVcbqlYsRgAjjQG"
        }
    })
    const json = await res.json()
    const books = json.data
    const paths = books.map((book) => ({
        params: {id: book.id.toString()},
    }))
    return {paths, fallback: false}
}

export async function getStaticProps({params}) {

    const res = await fetch(`https://systemm-library.herokuapp.com/api/admin/books/${params.id}`, {
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer 8|zGQOjpIyrSaGNRREOtPfH5aZjcVcbqlYsRgAjjQG"
        }
    })
    const book = await res.json()
    return {
        props: {
            book: {...book}
        }
    }
}

const Books = ({book}) => {

    const orderBook = (bookId, wantedDate, duration) => {
        console.log(bookId, wantedDate, duration)
        axios.post(`/order`, {bookId, wantedDate, duration}).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <Layout>
            <Book image={book.image} categories={book.categories} publishedYear={book.publishedYear}
                  name={book.name} description={book.description} author={book.author} count={book.count}
                  orderBook={(date, duration) => orderBook(book.id, date, duration)}/>
        </Layout>
    );
};

export default withAuth(Books);
