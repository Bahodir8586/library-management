import React from 'react';
import Layout from "../../components/layout/layout";
import withAuth from "../../HOCs/withAuth";
import UserProfile from "../../components/user/userProfile";

const Profile = () => {
	return (
		<Layout>
			<UserProfile/>
		</Layout>
	);
};

export default withAuth(Profile);