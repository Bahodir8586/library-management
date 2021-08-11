import React from 'react';
import Layout from "../../../components/layout/layout";
import BooksTable from "../../../components/table/booksTable";
import withAuth from "../../../HOCs/withAuth";

const Books = () => {
	return (
		<Layout>
			<BooksTable/>
		</Layout>
	);
};

export default withAuth(Books);