import React from 'react';
import Layout from "../../../components/layout";
import withAuth from "../../../HOCs/withAuth";
import UserBooks from "../../../components/user/userBooks";

const Book = () => {
	return (
		<Layout>
			<UserBooks/>
		</Layout>
	);
};

export default withAuth(Book);
