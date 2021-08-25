import React, {useState} from 'react';
import Layout from "../../../components/layout";
import AddLibrarian from "../../../components/admin/addLibrarian";
import withAuth from "../../../HOCs/withAuth";
import axios from "../../../utils/axios";
import SuccessModal from "../../../components/modals/successModal";
import {useRouter} from "next/router";

const Add = () => {
	const router=useRouter()
	const [showSuccessModal, setShowSuccessModal] = useState(false)
	const [successText, setSuccessText] = useState("")
	const handleSubmit = (e, username, fullName, password, image) => {
		e.preventDefault();
		console.log(username, fullName, password, image)
		const submitData = new FormData();
		submitData.append("fullName", fullName);
		submitData.append("username", username);
		submitData.append("password", password);
		submitData.append("image", image)
		axios.post(`/admin/librarians`, submitData).then(response => {
			console.log(response)
			setShowSuccessModal(true)
			setSuccessText("New librarian successfully added")
		}).catch(error => {
			console.log(error)
			//	TODO: show error message and reload the page
		})
	}
	return (
		<Layout>
			<SuccessModal show={showSuccessModal} title={"Congratulations"} onConfirm={() => {
				setShowSuccessModal(false)
				router.push("/admin/librarians");
			}} text={successText}/>
			 <AddLibrarian
					handleSubmit={(e, username, fullName, password, image) => handleSubmit(e, username, fullName,
																						   password, image)}/>
		</Layout>
	);
};

export default withAuth(Add);