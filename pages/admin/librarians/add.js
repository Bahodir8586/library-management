import React from 'react';
import Layout from "../../../components/layout/layout";
import AddLibrarian from "../../../components/forms/addLibrarian";
import withAuth from "../../../HOCs/withAuth";

const Add = () => {
	return (
		<Layout>
			<AddLibrarian/>
		</Layout>
	);
};

export default withAuth(Add);