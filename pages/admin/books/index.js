import React from 'react';
import Layout from "../../../components/layout";
import BooksTable from "../../../components/shared/booksTable";
import withAuth from "../../../HOCs/withAuth";

export async function getStaticProps({params}) {
	const res2 = await fetch(`https://systemm-library.herokuapp.com/api/admin/books`, {
		headers: {
			"Content-type": "application/json",
			"Authorization": "Bearer 8|zGQOjpIyrSaGNRREOtPfH5aZjcVcbqlYsRgAjjQG"
		}
	})
	const json = await res2.json()
	const books=json.data
	return {
		props: {
			books: [...books]
		}
	}
}

const Books = ({books}) => {
	return (
		<Layout>
			<BooksTable books={books}/>
		</Layout>
	);
};

export default withAuth(Books);
