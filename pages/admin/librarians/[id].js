import React, {useEffect, useState} from 'react';
import Layout from "../../../components/layout";
import withAuth from "../../../HOCs/withAuth";
import {useRouter} from "next/router";
import axios from "../../../utils/axios";
import EditLibrarian from "../../../components/admin/editLibrarian";

const Librarian = () => {
	const router = useRouter()
	const id = router.asPath.split("/")[3]
	const [data,setData]=useState({})
	useEffect(()=>{
		axios.get(`/admin/librarians/${id}`).then(response=>{
			setData(response.data)
		}).catch((error)=>{
			console.log(error)
		})
	},[router.asPath])


	const handleSubmit = (e, username, fullName, image) => {
		e.preventDefault();
		console.log(username, fullName, image)
		const submitData = new FormData();
		submitData.append("fullName", fullName);
		submitData.append("username", username);
		submitData.append("image", image)
		axios.post(`/admin/librarians/${id}`, submitData).then(response => {
			console.log(response)
			router.push("/admin/librarians")
		}).catch(error => {
			console.log(error)
		})
	}
	return (
		<Layout>
			<EditLibrarian
				handleSubmit={(e, username, fullName, image) => handleSubmit(e, username, fullName, image)} data={data} />
		</Layout>
	);
};

export default withAuth(Librarian);