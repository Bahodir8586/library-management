import React from 'react';

import withAuth from "../../../HOCs/withAuth";
import Layout from "../../../components/layout";
import UserBooks from "../../../components/user/userBooks";

export async function getStaticProps({params}) {
    try {
        const res2 = await fetch(`https://systemm-library.herokuapp.com/api/books`, {
            headers: {
                "Content-type": "application/json",
            }
        })
        const json = await res2.json()
        const books = json.data
        console.log("books: " + books)
        return {
            props: {
                books: [...books]
            }
        }
    } catch (e) {
        console.log(e)
        return {
            props: {
                books: []
            }
        }
    }

}

const Book = ({books}) => {
    return (
        <Layout>
            <UserBooks books={books}/>
        </Layout>
    );
};

export default withAuth(Book);
