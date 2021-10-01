import React from 'react';

import withAuth from "../../HOCs/withAuth";
import Layout from "../../components/layout";
import UserProfile from "../../components/user/userProfile";

const Profile = () => {
	return (
		<Layout>
			<UserProfile/>
		</Layout>
	);
};

export default withAuth(Profile);
