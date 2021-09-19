import React from 'react';
import Layout from "../../../components/layout";
import withAuth from "../../../HOCs/withAuth";
import BooksTable from "../../../components/shared/booksTable";

const Books = () => {
	return (
		<Layout>
			<BooksTable/>
		</Layout>
	);
};

export default withAuth(Books);
