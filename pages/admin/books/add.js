import React, {useEffect, useState} from 'react';
import Layout from "../../../components/layout";
import AddBook from "../../../components/shared/addBook";
import withAuth from "../../../HOCs/withAuth";
import axios from "../../../utils/axios";

const Add = () => {
	const [categories, setCategories] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

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
			//TODO: show success message then redirect to table page

			// router.push("/admin/books")
		}).catch(error => {
			console.log(error)
			//	TODO: show error message and reload the page
		})
	}


	useEffect(() => {
		//	TODO: get the list of all categories there
		setIsLoading(true)
		axios.get("/categories").then(response => {
			console.log(response)
			setCategories(response.data)
			setIsLoading(false)
		}).catch(error => {
			console.log(error)
			setIsLoading(false)
		})
	}, [])
	return (
		<Layout>
			{isLoading ? <div>Loading</div> :
				isError ? <div>Error</div> :
					<AddBook categories={categories}
							 addBook={(image, name, author, ISBN, publishedYear, description, count, selectedCategories) =>
								 addBook(image, name, author, ISBN, publishedYear, description, count,
										 selectedCategories)}/>}
		</Layout>
	);
};

export default withAuth(Add);