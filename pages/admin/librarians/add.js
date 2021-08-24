import React from 'react';
import Layout from "../../../components/layout";
import AddLibrarian from "../../../components/admin/addLibrarian";
import withAuth from "../../../HOCs/withAuth";
import axios from "../../../utils/axios";
import {useRouter} from "next/router";

const Add = () => {
	const router=useRouter()
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
			router.push("/admin/librarians")
		}).catch(error => {
			console.log(error)
		})
	}
	return (
		<Layout>
			<AddLibrarian handleSubmit={(e,username, fullName, password, image)=>handleSubmit(e,username, fullName, password, image)} />
		</Layout>
	);
};

export default withAuth(Add);