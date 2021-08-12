import React from 'react';
import Layout from "../../../components/layout/layout";
import AddBook from "../../../components/shared/addBook";
import withAuth from "../../../HOCs/withAuth";

const Add = () => {
	return (
		<Layout>
			<AddBook/>
		</Layout>
	);
};

export default withAuth(Add);