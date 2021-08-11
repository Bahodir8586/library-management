import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import {toNextPage, toPreviousPage} from "../../utils/pagination";

const OrdersTable = () => {
	const router = useRouter()
	const [data, setData] = useState([
										 {
											 id: 1,
											 user: {
												 id: 1,
												 name: "Abdullayev123",
											 },
											 book: {
												 id: 13,
												 name: "Anna Karenina"
											 },
											 librarian: {
												 id: 1,
												 name: "Nosirov445"
											 },
											 givenDate: "12.08.2021",
											 returnDate: "26.08.2021",
											 status: "onProcess",
										 },
										 {
											 id: 2,
											 user: {
												 id: 1,
												 name: "Abdullayev123",
											 },
											 book: {
												 id: 125,
												 name: "Urush va Tinchlik"
											 },
											 librarian: {
												 id: 2,
												 name: "Aliyeva01"
											 },
											 givenDate: "25.07.2021",
											 returnDate: "02.08.2021",
											 status: "finished",
										 },
										 {
											 id: 3,
											 user: {
												 id: 12,
												 name: "BookReader551",
											 },
											 book: {
												 id: 16,
												 name: "Qora Lola"
											 },
											 librarian: {
												 id: 2,
												 name: "Aliyeva01"
											 },
											 givenDate: "08.08.2021",
											 returnDate: "15.08.2021",
											 status: "inDebt",
										 },
										 {
											 id: 4,
											 user: {
												 id: 7,
												 name: "AnonymousUser",
											 },
											 book: {
												 id: 46,
												 name: "Harry Potter"
											 },
											 librarian: {
												 id: 1,
												 name: "Nosirov445"
											 },
											 givenDate: "09.08.2021",
											 returnDate: "23.08.2021",
											 status: "onProcess",
										 },
									 ])
	const [searchBy, setSearchBy] = useState({
												 value: "book",
												 options: [
													 {value: "book", name: "Book name"},
													 {value: "user", name: "User name"},
													 {value: "librarian", name: "Librarian name"},
												 ]
											 })
	const [filter, setFilter] = useState({
											 value: "all",
											 options: [
												 {value: "all", name: "All"},
												 {value: "onProcess", name: "On Process"},
												 {value: "finished", name: "Finished"},
												 {value: "inDebt", name: "In Debt Orders"}
											 ]
										 })
	const [searchText, setSearchText] = useState("")
	const [pageNumber, setPageNumber]=useState(1)
	const [haveNextPage, setHaveNextPage]=useState(true)

	useEffect(() => {
		search()
	}, [filter.value, searchBy.value, pageNumber])

	const filterChangeHandler = (e) => {
		const newFilter = {...filter};
		newFilter.value = e.target.value;
		setFilter(newFilter)
	}
	const searchByChangeHandler = (e) => {
		const newSearchBy = {...searchBy};
		newSearchBy.value = e.target.value;
		setSearchBy(newSearchBy)
	}

	const search = () => {
		console.log(filter.value, searchBy.value, searchText)
	}

	return (
		<div className="container mx-auto px-4 sm:px-8 w-full">
			<div className="py-8">
				<div className="flex flex-row mb-1 sm:mb-0 justify-between w-full items-center">
					<h2 className="text-6xl leading-tight w-1/6">
						Orders
					</h2>
					<div className="text-end w-3/4">
						<form
							className="flex flex-col md:flex-row w-3/4 md:w-full md:space-x-3 space-y-3 md:space-y-0 justify-end items-end w-full"
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

							<div className=" relative w-1/3">
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
									Filter:
								</label>
								<select onChange={(e) => filterChangeHandler(e)}
										className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
									{filter.options.map(el => <option className={"py-2 px-4"} value={el.value}
																	  key={el.value}>{el.name}</option>)}
								</select>
							</div>

							<div className={"w-1/6 text-center"}>
								<button
									className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
									type="button" onClick={search}>
									Search
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
					<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
						<table className="min-w-full leading-normal">
							<thead>
							<tr>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
									User
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
									Book
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
									Librarian
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
									Given Date
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
									Return Date
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
									Status
								</th>
							</tr>
							</thead>
							<tbody>
							{data.map(el =>
										  <tr key={el.id} className={el.status==="onProcess"?"bg-green-50":el.status==="inDebt"?"bg-red-50":"bg-yellow-50"}>
											  <td className="px-5 py-3 border-b border-gray-200 text-sm text-center">
												  <Link href={`/admin/users/${el.user.id}`}>
													  <div className="flex items-center cursor-pointer justify-center">
														  <p className="text-gray-900 whitespace-no-wrap text-center">
															  {el.user.name}
														  </p>
													  </div>
												  </Link>
											  </td>
											  <td className="px-5 py-3 border-b border-gray-200 text-sm text-center">
												  <Link href={`/admin/books/${el.book.id}`}>
													  <div className="flex items-center cursor-pointer justify-center">
														  <p className="text-gray-900 whitespace-no-wrap text-center">
															  {el.book.name}
														  </p>
													  </div>
												  </Link>
											  </td>
											  <td className="px-5 py-3 border-b border-gray-200 text-sm text-center">
												  <Link href={`/admin/librarians/${el.librarian.id}`}>
													  <div className="flex items-center cursor-pointer justify-center">
														  <p className="text-gray-900 whitespace-no-wrap text-center">
															  {el.librarian.name}
														  </p>
													  </div>
												  </Link>
											  </td>
											  <td className="px-5 py-3 border-b border-gray-200 text-sm text-center">
												  <p className="text-gray-900 whitespace-no-wrap">
													  {el.givenDate}
												  </p>
											  </td>
											  <td className="px-5 py-3 border-b border-gray-200 text-sm text-center">
												  <p className="text-gray-900 whitespace-no-wrap">
													  {el.returnDate}
												  </p>
											  </td>
											  <td className="px-5 py-3 border-b border-gray-200 text-sm text-center flex justify-center">
												  {el.status === "onProcess" ?
													  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
															<span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full"/>
															<span className="relative">
																On Process
															</span>
													  </span> : el.status === "inDebt" ?
													  <span className="relative inline-block px-3 py-1 font-semibold text-red-600 leading-tight">
															<span aria-hidden="true" className="absolute inset-0 bg-red-200 opacity-50 rounded-full"/>
															<span className="relative">
																In Debt
															</span>
													  </span> :
													  <span className="relative inline-block px-3 py-1 font-semibold text-yellow-600 leading-tight">
															<span aria-hidden="true" className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"/>
															<span className="relative">
																Finished
															</span>
													  </span>}
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

export default OrdersTable;