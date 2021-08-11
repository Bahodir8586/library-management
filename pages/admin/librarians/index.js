import React from 'react';
import Layout from "../../../components/layout/layout";
import LibrariansTable from "../../../components/table/librariansTable";
import withAuth from "../../../HOCs/withAuth";

const Librarians = () => {
	return (
		<Layout>
			<LibrariansTable/>
		</Layout>
	);
};

export default withAuth(Librarians);