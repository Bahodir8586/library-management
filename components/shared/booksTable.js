import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {isPaginated, toNextPage, toPreviousPage} from "../../utils/pagination";
import {useRouter} from "next/router";
import axios from "../../utils/axios";
import WarningModal from "../modals/warningModal";
import SuccessModal from "../modals/successModal";

const BooksTable = () => {
	const role = "admin"
	const router = useRouter()
	const [data, setData] = useState([
										 {
											 id: 1,
											 image: "/url",
											 name: "1984",
											 author: "Abdullayev Bahodir",
											 ISBN: "100006105",
											 publishedYear: "2016",
											 count: "47",
											 originalCount: "50",
											 categories: [{id: 1, name: "detective"}, {id: 2, name: "fantastic"}]
										 },
										 {
											 id: 2,
											 image: "/url",
											 name: "Jinoyat va Jazo",
											 author: "Kim Chen In",
											 ISBN: "100006335",
											 publishedYear: "1950",
											 count: "25",
											 originalCount: "25",
											 categories: [{id: 3, name: "politics"}, {id: 2, name: "fantastic"}]
										 },
										 {
											 id: 3,
											 image: "/url",
											 name: "Anna Karenina",
											 author: "Lev Tolstoy",
											 ISBN: "103006105",
											 publishedYear: "1920",
											 count: "3",
											 originalCount: "40",
											 categories: [{id: 1, name: "romantic"}]
										 },
										 {
											 id: 4,
											 image: "/url",
											 name: "Farg'ona tong otguncha",
											 author: "Qobilov Xurshidbek",
											 ISBN: "100406105",
											 publishedYear: "2020",
											 count: "16",
											 originalCount: "20",
											 categories: [{id: 2, name: "fantastic"}, {id: 4, name: "romantic"}]
										 }
									 ])

	const [searchBy, setSearchBy] = useState({
												 value: "name",
												 options: [
													 {value: "name", name: "Name"},
													 {value: "author", name: "Author"},
													 {value: "isbn", name: "ISBN"},
												 ]
											 })
	const [searchText, setSearchText] = useState("")
	const [sort, setSort] = useState({
										 value: "alphabet",
										 options: [
											 {value: "alphabet", name: "A-Z"},
											 {value: "publishedDate", name: "Published Date"}
										 ]
									 })
	const [filter, setFilter] = useState({
											 value: "all",
											 options: [
												 {value: "all", name: "All"},
												 {value: "romantic", name: "Romantic"},
												 {value: "detective", name: "Detective"},
												 {value: "politics", name: "Politics"},
												 {value: "fantastic", name: "Fantastic"}
											 ]
										 })
	const [fromYear, setFromYear] = useState(undefined)
	const [toYear, setToYear] = useState(undefined)

	const [pageNumber, setPageNumber] = useState(1)
	const [haveNextPage, setHaveNextPage] = useState(true)

	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selectedBook, setSelectedBook] = useState({})
	const [showSuccessModal, setShowSuccessModal] = useState(false)
	const [successText, setSuccessText] = useState("")

	const filterChangeHandler = (e) => {
		const newFilter = {...filter};
		newFilter.value = e.target.value;
		setFilter(newFilter)
	}
	const sortChangeHandler = (e) => {
		const newSort = {...sort};
		newSort.value = e.target.value;
		setSort(newSort)
	}
	const searchByChangeHandler = (e) => {
		const newSearchBy = {...searchBy};
		newSearchBy.value = e.target.value;
		setSearchBy(newSearchBy)
	}

	const search = (e) => {
		console.log(filter.value, searchText, searchBy.value, sort.value, fromYear, toYear, pageNumber)
		axios.get(
			`/api/admin/books/search?filter=${filter.value}&searchText=${searchText}&searchBy=${searchBy.value}&sort=${sort.value}&fromYear=${fromYear}&toYear=${toYear}&page=${pageNumber}`)
			 .then(response => {
				 setHaveNextPage(isPaginated(response));
				 setData(response.data)
			 }).catch(error => {
			console.log(error)
		})
	}

	const editBookHandler = (id) => {
		console.log(id)
		router.push(`/${role}/books/${id}`).then().catch(error => {
			console.log(error)
			router.reload()
		})
	}

	const deleteBookHandler = (id) => {
		axios.delete(`/admin/books/${id}`).then(response=>{
			console.log(response)
			setSuccessText("Book successfully deleted")
			setShowSuccessModal(true)
		}).catch(error=>{
			console.log(error)
		//	TODO: show fail modal and reload the page
		})
	}

	const finishDelete=()=>{
		setShowDeleteModal(false)
		setSelectedBook({})
	}

	useEffect(() => {
		search()
	}, [filter.value, searchBy.value, sort.value, pageNumber])

	return (
		<div className="container mx-auto px-4 sm:px-8 w-full">
			<WarningModal
				title={"Are you sure"}
				show={showDeleteModal}
				onConfirm={() => {
					deleteBookHandler(selectedBook.id)
					finishDelete()
				}}
				onCancel={() => {
					finishDelete()
				}}>
				Do you want to delete librarian {selectedBook.name}
			</WarningModal>
			<SuccessModal show={showSuccessModal} title={"Congratulations"} onConfirm={() => {
				search()
				setShowSuccessModal(false)
			}} text={successText}/>
			<div className="py-8">
				<div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
					<div className={"w-1/12"}>
						<h2 className="text-6xl leading-tight ml-2">
							Books
						</h2>

					</div>

					<div className="text-end w-11/12">
						<form
							className="flex flex-col flex-wrap items-center md:flex-row w-3/4 md:w-full md:space-x-3 space-y-3 md:space-y-0 justify-center w-full"
							onSubmit={(e) => {
								e.preventDefault();
								search()
							}}>
							<div className=" relative w-1/4 px-4">
								<label className="text-gray-700 mr-3">
									Search by:
								</label>
								<select onChange={(e) => searchByChangeHandler(e)}
										className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
									{searchBy.options.map(el => <option className={"py-2 px-4"} value={el.value}
																		key={el.value}>{el.name}</option>)}
								</select>
							</div>
							<div className=" relative w-1/3 px-4">
								<label className="text-gray-700 mr-3">
									Search:
								</label>
								<input type="text" id="&quot;form-subscribe-Filter"
									   className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
									   placeholder="Search" value={searchText}
									   onChange={(e) => setSearchText(e.target.value)}/>
							</div>
							<div className=" relative w-1/4 px-4">
								<label className="text-gray-700 mr-3">
									Sort by:
								</label>
								<select onChange={(e) => sortChangeHandler(e)}
										className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
									{sort.options.map(el => <option className={"py-2 px-4"} value={el.value}
																	key={el.value}>{el.name}</option>)}
								</select>
							</div>
							<div className={"pt-4 relative w-1/4 px-4"}>
								{/*	From Year Range */}
							</div>
							<div className={"pt-4 relative w-1/4 px-4"}>
								{/*	 To Year Range*/}
							</div>
							<div className={"pt-4 relative w-1/4 px-4"}>
								<label className={"text-gray-700 mr-3"}>
									Filter:
								</label>
								<select onChange={(e) => filterChangeHandler(e)}
										className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
									{filter.options.map(el => <option className={"py-2 px-4"} value={el.value}
																	  key={el.value}>{el.name}</option>)}
								</select>
							</div>
							<div className={"pt-4 relative w-1/6 px-4 flex items-center justify-around"}>
								<div className={"text-center mt-4"}>
									<button
										className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
										type="button" onClick={search}>
										Search
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
					<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
						<table className="min-w-full leading-normal mt-8">
							<thead>
							<tr>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
									Name
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
									Author
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
									ISBN
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
									Published year
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
									Count
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
									Categories
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
									Actions
								</th>
							</tr>
							</thead>
							<tbody>
							{data.map(el =>
										  <tr key={el.id}>
											  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
												  <Link href={`/${role}/books/${el.id}`}>
													  <div className="flex items-center cursor-pointer">
														  <div className="flex-shrink-0">
															  <img alt={el.name} src={el.image}
																   className="mx-auto object-cover rounded-full h-10 w-10 "/>
														  </div>
														  <div className="ml-3">
															  <p className="text-gray-900 whitespace-no-wrap font-medium text-lg">
																  {el.name}
															  </p>
														  </div>
													  </div>
												  </Link>
											  </td>
											  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
												  <p className="text-gray-900 whitespace-no-wrap">
													  {el.author}
												  </p>
											  </td>
											  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
												  <p className="whitespace-no-wrap text-yellow-700 font-medium">
													  {el.ISBN}
												  </p>
											  </td>
											  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
												  <p className="whitespace-no-wrap text-purple-600 font-medium">
													  {el.publishedYear}
												  </p>
											  </td>
											  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
												  <p className="text-gray-900 whitespace-no-wrap">
													  <span
														  className={"text-green-600 text-lg font-medium"}>{el.count}</span> / {el.originalCount}
												  </p>
											  </td>
											  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
												  <div
													  className="text-gray-900 flex flex-wrap items-center justify-center">
													  {el.categories.map(
														  category => <span key={category.id}
																			className={"px-4 py-1 mx-1 text-base rounded-full text-white  bg-indigo-500 "}>{category.name}</span>)}
												  </div>
											  </td>
											  <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center flex justify-center">
												  <button onClick={() => {
													  editBookHandler(el.id)
												  }} type="button"
														  className="mx-3 py-2 px-9 flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
													  Edit
												  </button>
												  <button onClick={() => {
													  setSelectedBook(el)
													  setShowDeleteModal(true)
												  }} type="button"
														  className="mx-3 py-2 px-7 flex justify-center items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
													  Delete
												  </button>
											  </td>
										  </tr>
							)}
							</tbody>
						</table>
						<div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
							<div className="flex items-center">
								<button onClick={() => setPageNumber(toPreviousPage(pageNumber))} type="button"
										className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
									<svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792"
										 xmlns="http://www.w3.org/2000/svg">
										<path
											d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
										</path>
									</svg>
								</button>
								<button type="button"
										className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 ">
									{pageNumber}
								</button>
								<button onClick={() => setPageNumber(toNextPage(pageNumber, haveNextPage))}
										type="button"
										className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">
									<svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792"
										 xmlns="http://www.w3.org/2000/svg">
										<path
											d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
										</path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BooksTable;