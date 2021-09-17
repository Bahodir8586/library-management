import React from 'react';
import Layout from "../../../components/layout";
import withAuth from "../../../HOCs/withAuth";
import EditBook from "../../../components/shared/editBook";



const Books = () => {
	return (
		<Layout>
			<EditBook/>
		</Layout>
	);
};

export default withAuth(Books);
