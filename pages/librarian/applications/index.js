import React from 'react';

import withAuth from "../../../HOCs/withAuth";
import Layout from "../../../components/layout";
import ApplicationsTable from "../../../components/librarian/applicationsTable";

const Applications = () => {
	return (
		<Layout>
			<ApplicationsTable/>
		</Layout>
	);
};

export default withAuth(Applications);
