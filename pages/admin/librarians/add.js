import React from 'react';
import Layout from "../../../components/layout";
import AddLibrarian from "../../../components/admin/addLibrarian";
import withAuth from "../../../HOCs/withAuth";
import axios from "../../../utils/axios";

const Add = () => {
	const handleSubmit = (e,username, fullName, password, image) => {
		e.preventDefault();
		console.log(username, fullName, password, image)
		const submitData=new FormData();
		submitData.append("fullName",fullName);
		submitData.append("username",username);
		submitData.append("password",password);
		submitData.append("image", image)
		axios.post(`/admin/librarians`,submitData).then(response => {
			console.log(response)
			//TODO: show success message then redirect to table page

			// router.push("/admin/librarians")
		}).catch(error => {
			console.log(error)
			//	TODO: show error message and reload the page
		})
	}
	return (
		<Layout>
			<AddLibrarian handleSubmit={(e,username, fullName, password, image)=>handleSubmit(e,username, fullName, password, image)} />
		</Layout>
	);
};

export default withAuth(Add);