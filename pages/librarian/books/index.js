import React from 'react';

import withAuth from "../../../HOCs/withAuth";
import Layout from "../../../components/layout";
import BooksTable from "../../../components/shared/booksTable";

const Books = () => {
	return (
		<Layout>
			<BooksTable/>
		</Layout>
	);
};

export default withAuth(Books);
