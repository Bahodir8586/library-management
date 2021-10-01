import React from 'react';

import withAuth from "../../../HOCs/withAuth";
import Layout from "../../../components/layout";
import UsersTable from "../../../components/shared/usersTable";

const Users = () => {
	return (
		<Layout>
			<UsersTable/>
		</Layout>
	);
};

export default withAuth(Users);
