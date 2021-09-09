import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {toNextPage, toPreviousPage} from "../../utils/pagination";
import {useRouter} from "next/router";
import {changer} from "../../utils/filterChangers";

const ApplicationsTable = () => {
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
												 name: "Boy ota, kambag'al ota",
												 count:5
											 },
											 wantedGetDate: "22.08.2021",
											 duration: 14,
										 },
										 {
											 id: 2,
											 user: {
												 id: 1,
												 name: "Abdullayev123",
											 },
											 book: {
												 id: 125,
												 name: "Zukkolar va landovurlar",
												 count:1
											 },
											 wantedGetDate: "23.08.2021",
											 duration: 10,
										 },
										 {
											 id: 3,
											 user: {
												 id: 12,
												 name: "BookReader551",
											 },
											 book: {
												 id: 16,
												 name: "Molxona",
												 count:30
											 },
											 wantedGetDate: "25.08.2021",
											 duration: 20,
										 },
										 {
											 id: 4,
											 user: {
												 id: 7,
												 name: "AnonymousUser",
											 },
											 book: {
												 id: 46,
												 name: "1984",
												 count:14
											 },
											 wantedGetDate: "21.08.2021",
											 duration: 14,
										 },
									 ])
	const [searchBy, setSearchBy] = useState({
												 value: "book",
												 options: [
													 {value: "book", name: "Book name"},
													 {value: "user", name: "User name"},
												 ]
											 })
	const [searchText, setSearchText] = useState("")
	const [pageNumber, setPageNumber]=useState(1)
	const [haveNextPage, setHaveNextPage]=useState(true)

	useEffect(() => {
		search()
	}, [searchBy.value, pageNumber])

	const search = () => {
		console.log(searchBy.value, searchText)
	}

	const giveBookHandler=(id)=>{
	//	TODO: handle giving the book to user function
	}
	const notToGiveBookHandler=(id)=>{
	//	TODO: open modal to write the comment and cancel application
	}

	return (
		<div className="container mx-auto px-4 sm:px-8 w-full">
			<div className="py-8">
				<div className="flex flex-row mb-1 sm:mb-0 justify-between w-full items-center">
					<h2 className="text-6xl leading-tight w-1/6">
						Applications
					</h2>
					<div className="text-end w-3/4">
						<form
							className="flex flex-col md:flex-row w-3/4 md:w-full md:space-x-3 space-y-3 md:space-y-0 justify-end items-end w-full"
							onSubmit={(e) => {
								e.preventDefault();
								search()
							}}>

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
									Search by:
								</label>
								<select onChange={(e) => setSearchBy(changer(searchBy,e.target.value))}
										className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
									{searchBy.options.map(el => <option className={"py-2 px-4"} value={el.value}
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
									Count
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
									Book Wanted Get Date
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
									Duration
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
									Actions
								</th>
							</tr>
							</thead>
							<tbody>
							{data.map(el =>
										  <tr key={el.id} className={"bg-white"}>
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
												  <p className="text-gray-900 whitespace-no-wrap">
													  {el.book.count}
												  </p>
											  </td>
											  <td className="px-5 py-3 border-b border-gray-200 text-sm text-center">
												  <p className="text-gray-900 whitespace-no-wrap">
													  {el.wantedGetDate}
												  </p>
											  </td>
											  <td className="px-5 py-3 border-b border-gray-200 text-sm text-center">
												  <p className="text-gray-900 whitespace-no-wrap">
													  {el.duration} (days)
												  </p>
											  </td>
											  <td className="px-5 py-3 border-b border-gray-200 text-sm text-center flex justify-center">
												  <button onClick={() => {
													  giveBookHandler(el.id)
												  }} type="button"
														  className="mx-auto py-2 px-5 flex justify-center items-center  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
													  Allow
												  </button>
												  <button onClick={() => {
													  notToGiveBookHandler(el.id)
												  }} type="button"
														  className="mx-auto py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
													  Refuse
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

export default ApplicationsTable;
