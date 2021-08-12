import React from 'react';
import Index from "../../../components/layout";
import withAuth from "../../../HOCs/withAuth";
import UserBooks from "../../../components/user/userBooks";

const Book = () => {

	return (
		<Index>
			<UserBooks/>
		</Index>
	);
};

export default withAuth(Book);