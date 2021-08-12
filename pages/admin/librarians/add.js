import React from 'react';
import Layout from "../../../components/layout";
import AddLibrarian from "../../../components/admin/addLibrarian";
import withAuth from "../../../HOCs/withAuth";

const Add = () => {
	return (
		<Layout>
			<AddLibrarian/>
		</Layout>
	);
};

export default withAuth(Add);