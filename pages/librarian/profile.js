import React from 'react';
import Layout from "../../components/layout";
import withAuth from "../../HOCs/withAuth";
import LibrarianProfile from "../../components/librarian/librarianProfile";

const Profile = () => {
	return (
		<Layout>
			<LibrarianProfile/>
		</Layout>
	);
};

export default withAuth(Profile);
