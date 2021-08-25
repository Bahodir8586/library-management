import React, {useEffect, useState} from 'react';
import Layout from "../../../components/layout";
import AddBook from "../../../components/shared/addBook";
import withAuth from "../../../HOCs/withAuth";
import axios from "../../../utils/axios";
import SuccessModal from "../../../components/modals/successModal";
import {useRouter} from "next/router";
import Spinner from "../../../components/loaders/spinner/spinner";

const Add = () => {
	const router=useRouter()
	const [categories, setCategories] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [showSuccessModal, setShowSuccessModal] = useState(false)
	const [successText, setSuccessText] = useState("")

	const addBook = (image, name, author, ISBN, publishedYear, description, count, selectedCategories) => {
		const submitData = new FormData();
		submitData.append("name", name);
		submitData.append("author", author);
		submitData.append("ISBN", ISBN);
		submitData.append("publishedYear", publishedYear);
		submitData.append("description", description);
		submitData.append("count", count);
		submitData.append("count", JSON.stringify(selectedCategories));
		submitData.append("image", image)
		axios.post(`/admin/books`, submitData).then(response => {
			console.log(response)
			setSuccessText(`${name} book successfully added to database`)
			setShowSuccessModal(true)
		}).catch(error => {
			console.log(error)
			//	TODO: show error message and reload the page
		})
	}


	useEffect(() => {
		// get the list of all categories there
		setIsLoading(true)
		setIsError(false)
		axios.get("/categories").then(response => {
			console.log(response)
			setCategories(response.data)
			setIsLoading(false)
		}).catch(error => {
			console.log(error)
			setIsError(true)
			setIsLoading(false)
		})
	}, [])
	return (
		<Layout>
			<SuccessModal show={showSuccessModal} title={"Congratulations"} onConfirm={() => {
				setShowSuccessModal(false)
				router.push("/admin/books");
			}} text={successText}/>
			{isLoading ? <Spinner/> :
				isError ? <div>Error</div> :
					<AddBook categories={categories}
							 addBook={(image, name, author, ISBN, publishedYear, description, count, selectedCategories) =>
								 addBook(image, name, author, ISBN, publishedYear, description, count,
										 selectedCategories)}/>}
		</Layout>
	);
};

export default withAuth(Add);