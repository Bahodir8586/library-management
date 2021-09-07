import React, {useEffect, useState} from 'react';
import Layout from "../../../components/layout";
import withAuth from "../../../HOCs/withAuth";
import {useRouter} from "next/router";
import axios from "../../../utils/axios";
import EditLibrarian from "../../../components/admin/editLibrarian";
import Spinner from "../../../components/loaders/spinner/spinner";
import FailModal from "../../../components/modals/failModal";
import SuccessModal from "../../../components/modals/successModal";

const Librarian = () => {
	const router = useRouter()
	const id = router.asPath.split("/")[3]
	const [data, setData] = useState({})

	const [isLoading, setIsLoading] = useState(false)
	const [successText, setSuccessText]=useState("")
	const [showSuccessModal,setShowSuccessModal]=useState(false)
	const [errorText, setErrorText]=useState("")
	const [showFailModal,setShowFailModal]=useState(false)

	useEffect(() => {
		setIsLoading(true)
		axios.get(`/admin/librarians/${id}`).then(response => {
			console.log(response)
			setData(response.data)
			setIsLoading(false)
		}).catch((error) => {
			console.log(error)
			setIsLoading(false)
		})
	}, [router.asPath])

	const handleSubmit = (e, username, fullName, image) => {
		e.preventDefault();
		console.log(username, fullName, image)
		const submitData = new FormData();
		submitData.append("fullName", fullName);
		submitData.append("username", username);
		submitData.append("image", image)
		if(!username|| !fullName){
			setShowFailModal(true)
			setErrorText("Please fill all the fields")
			return
		}
		setIsLoading(true)
		axios.post(`/admin/librarians/${id}`, submitData).then(response => {
			console.log(response)
			setIsLoading(false)
			setSuccessText("Librarian information successfully edited")
			setShowSuccessModal(true)
		}).catch(error => {
			console.log(error)
			setIsLoading(false)
			setErrorText("Something went wrong. Please try again later")
			setShowFailModal(true)
		})
	}
	return (
		<Layout>
			<SuccessModal show={showSuccessModal} title={"Congratulations"} onConfirm={() => {
				setShowSuccessModal(false)
				router.push("/admin/librarians");
			}} text={successText}/>
			<FailModal show={showFailModal} title={"Error"} onConfirm={() => {
				setErrorText("")
				setShowFailModal(false)
			}} text={errorText}/>
			{isLoading ? <Spinner/> : <EditLibrarian
				handleSubmit={(e, username, fullName, image) => handleSubmit(e, username, fullName, image)}
				data={data}/>}

		</Layout>
	);
};

export default withAuth(Librarian);
