import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout";
import withAuth from "../../HOCs/withAuth";
import AdminProfile from "../../components/admin/adminProfile";
import axios from "../../utils/axios";

const Profile = () => {
	const [name, setName] = useState("")
	const [categories, setCategories] = useState([])

	const handleSubmit = (e, username, oldPassword, newPassword, confirmNewPassword) => {
		e.preventDefault();
		if (!oldPassword && !newPassword && !confirmNewPassword) {
			//TODO: send request without passwords
		}
		if (newPassword !== confirmNewPassword) {
			//	TODO: fail alert. two passwords are not equal
		}
		if (newPassword.length < 6) {
			//TODO: fail alert because of validation
		}
		//	TODO: send normal request
	}

	useEffect(() => {
		// getting the name of admin
		axios.get(`admin`).then(response => {
			console.log(response.data)
			setName(response.data)
		}).catch(error => {
			console.log(error)
		})
		// loading categories initially
		getCategories()
	}, [])

	const addCategory = (e, newCategory) => {
		e.preventDefault()
		//	TODO: handle add category function there
		axios.post(`/categories/`, {name: newCategory}).then(response => {
			console.log(response.data)
			//	TODO: show success modal and reload categories list
		}).catch((error) => {
			console.log(error)
			//	TODO: show fail modal
		})
	}

	const deleteCategory = (id) => {
		//	TODO: handle delete category function there
		axios.delete(`/categories/${id}`).then(response => {
			console.log(response.data)
			//	TODO: show success modal and reload categories list
		}).catch((error) => {
			console.log(error)
			//	TODO: show fail modal
		})
	}

	const getCategories = () => {
		//	TODO: handle get categories there
		axios.get("/categories/").then(response => {
			console.log(response.data)
			setCategories(response.data)
		}).catch((error) => {
			console.log(error)
		})
	}

	return (
		<Layout>
			<AdminProfile name={"Abdullayev Bahodir"} categories={categories}
						  handleSubmit={(e, username, oldPassword, newPassword, confirmNewPassword) => handleSubmit(e,
																													username,
																													oldPassword,
																													newPassword,
																													confirmNewPassword)}
						  addCategory={(e, newCategory) => addCategory(e, newCategory)}
						  deleteCategory={(id) => deleteCategory(id)}/>
		</Layout>
	);
};

export default withAuth(Profile);