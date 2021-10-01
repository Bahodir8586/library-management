import React from 'react';
import {useRouter} from "next/router";

import withAuth from "../../../HOCs/withAuth";
import axios from "../../../utils/axios";
import Layout from "../../../components/layout";
import Book from "../../../components/user/book";

//TODO: get information there statically
export async function getStaticPaths() {
    const res = await fetch('https://systemm-library.herokuapp.com/api/books', {
        headers: {
            "Content-type": "application/json",
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
    try {
        const res = await fetch(`https://systemm-library.herokuapp.com/api/books/${params.id}`, {
            headers: {
                "Content-type": "application/json",
            }
        })
        console.log(res)
        const book = await res.json()
        console.log(book)
        return {
            props: {
                book: {...book}
            }
        }
    } catch (e) {
        console.log(e)
        return {
            props: {
                book: {}
            }
        }
    }

}

const Books = ({book}) => {
    const router=useRouter()
    console.log(book)
    const orderBook = (id, wantedDate, wantedDuration) => {
        const bookId=id??router.asPath.split("/")[3]
        console.log(bookId, wantedDate, wantedDuration)
        axios.post(`/user/order`, {bookId, wantedDate, wantedDuration}).then(response => {
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
