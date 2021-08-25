import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout";
import withAuth from "../../HOCs/withAuth";
import AdminProfile from "../../components/admin/adminProfile";
import axios from "../../utils/axios";
import SuccessModal from "../../components/modals/successModal";

const Profile = () => {
	const [name, setName] = useState("Abdullayev Bahodir")
	const [categories, setCategories] = useState([])
	const [showSuccessModal,setShowSuccessModal]=useState(false)
	const [successText, setSuccessText]=useState("")

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

	const getCategories = () => {
		//	TODO: handle get categories there
		axios.get("/categories/").then(response => {
			console.log(response.data)
			setCategories(response.data)
		}).catch((error) => {
			console.log(error)
		})
	}

	const addCategory = (e, newCategory) => {
		e.preventDefault()
		console.log({name: newCategory})
		//	TODO: handle add category function there
		axios.post(`/admin/categories`, {name: newCategory}).then(response => {
			console.log(response.data)
			setSuccessText("New category successfully added")
			setShowSuccessModal(true)
			getCategories()
			//	TODO: show success modal and reload categories list
		}).catch((error) => {
			console.log(error)
			//	TODO: show fail modal
		})
	}

	const editCategory = (id, name) => {
		axios.patch(`admin/categories/${id}`, {name: name}).then(response => {
			console.log(response)
			setSuccessText("Category successfully edited")
			setShowSuccessModal(true)
			getCategories()
			//	TODO: show success modal and reload categories list
		}).catch(error => {
			console.log(error)
			//	TODO: show fail modal
		})
	}

	const deleteCategory = (id) => {
		//	TODO: handle delete category function there
		axios.delete(`/admin/categories/${id}`).then(response => {
			console.log(response.data)
			setSuccessText("Category successfully deleted")
			setShowSuccessModal(true)
			getCategories()
			//	TODO: show success modal and reload categories list
		}).catch((error) => {
			console.log(error)
			//	TODO: show fail modal
		})
	}

	return (
		<Layout>
			<SuccessModal  show={showSuccessModal} title={"Congratulations"} onConfirm={()=>setShowSuccessModal(false)} text />
			<AdminProfile name={name} categories={categories}
						  handleSubmit={(e, username, oldPassword, newPassword, confirmNewPassword) => handleSubmit(e,
																													username,
																													oldPassword,
																													newPassword,
																													confirmNewPassword)}
						  addCategory={(e, newCategory) => addCategory(e, newCategory)}
						  editCategory={(id, name) => editCategory(id, name)}
						  deleteCategory={(id) => deleteCategory(id)}/>
		</Layout>
	);
};

export default withAuth(Profile);