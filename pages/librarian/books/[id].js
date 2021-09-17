import React from 'react';
import Layout from "../../../components/layout";
import withAuth from "../../../HOCs/withAuth";
import BooksTable from "../../../components/shared/booksTable";

const Book = () => {
	return (
		<Layout>
			<BooksTable/>
		</Layout>
	);
};

	export default withAuth(Book);
