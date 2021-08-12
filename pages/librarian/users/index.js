import React from 'react';
import Layout from "../../../components/layout/layout";
import Table from "../../../components/shared/usersTable";
import withAuth from "../../../HOCs/withAuth";

const Users = () => {
	return (
		<Layout>
			<Table/>
		</Layout>
	);
};

export default withAuth(Users);