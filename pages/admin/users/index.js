import React from 'react';
import Layout from "../../../components/layout/layout";
import UsersTable from "../../../components/table/usersTable";
import withAuth from "../../../HOCs/withAuth";

const Students = () => {
	return (
		<Layout>
			<UsersTable/>
		</Layout>
	);
};

export default withAuth(Students);