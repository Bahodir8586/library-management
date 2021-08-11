import React from 'react';
import Layout from "../../../components/layout/layout";
import withAuth from "../../../HOCs/withAuth";
import ApplicationsTable from "../../../components/table/applicationsTable";

const Applications = () => {
	return (
		<Layout>
			<ApplicationsTable/>
		</Layout>
	);
};

export default withAuth(Applications);