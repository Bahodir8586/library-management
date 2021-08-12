import React from 'react';
import Layout from "../../../components/layout";
import BooksTable from "../../../components/shared/booksTable";
import withAuth from "../../../HOCs/withAuth";

const Books = () => {
	return (
		<Layout>
			<BooksTable/>
		</Layout>
	);
};

export default withAuth(Books);