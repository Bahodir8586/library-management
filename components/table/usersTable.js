import React, {useEffect, useState} from 'react';
import Link from "next/link";

const UsersTable = () => {
	//FIXME: fix this
	const role = "admin"
	const [data, setData] = useState([
										 {
											 id: 1,
											 image: "/url",
											 fullName: "Abdullayev Bahodir",
											 email: "bahodira213@gmail.com",
											 active: true,
										 },
										 {
											 id: 2,
											 image: "/url",
											 fullName: "Nosirov Mirfayz",
											 email: "mirfayzrak@gmail.com",
											 active: true,
										 },
										 {
											 id: 3,
											 image: "/url",
											 fullName: "O'ralov Shahzod",
											 email: "shahzodprogrammer@gmail.com",
											 active: false,
										 },
										 {
											 id: 4,
											 image: "/url",
											 fullName: "Qobilov Xurshidbek",
											 email: "sherlockboy12@gmail.com",
											 active: true,
										 }
									 ])
	const [filter, setFilter] = useState({
											 value: "all",
											 options: [
												 {value: "all", name: "All users"},
												 {value: "blocked", name: "Blocked users"},
												 {value: "active", name: "Active users"},
												 {value: "debtor", name: "Debtor users"},
												 {value: "noDebtor", name: "Debt-free users"},
											 ]
										 })
	const [searchBy, setSearchBy] = useState({
												 value: "email",
												 options: [
													 {value: "email", name: "Email"},
													 {value: "fullName", name: "Full name"},
												 ]
											 })
	const [searchText, setSearchText] = useState("")
	const [pageNumber,setPageNumber]=useState(1)
	const [haveNextPage, setHaveNextPage]=useState(true)

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

	const search = (e) => {
		console.log(filter.value, searchText, searchBy.value, pageNumber)
	//	TODO: handle search function there. Use above properties
	}

	const toPreviousPage=()=>{
		if (pageNumber === 1) {
			return;
		}
		let pageNum = pageNumber - 1;
		setPageNumber(pageNum);
		window.scrollTo(0, 0);
	}

	const toNextPage=()=>{
		if (!haveNextPage) {
			return;
		}
		let pageNum = pageNumber + 1;
		setPageNumber(pageNum);
		window.scrollTo(0, 0);
	}

	const blockUserHandler=(id)=>{
		console.log(id)
	//	TODO: handle block function there. Apply writing message to the user there
	}

	const unblockUserHandler=(id)=>{
		console.log(id)
	//	TODO: handle unblock function there. Apply writing message to the user there
	}

	useEffect(() => {
		search()
	}, [filter.value, searchBy.value, pageNumber])

	return (
		<div className="container mx-auto px-4 sm:px-8 w-full">
			<div className="py-8">
				<div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
					<h2 className="text-2xl leading-tight w-1/4">
						Users
					</h2>
					<div className="text-end w-3/4">
						<form
							className="flex flex-col md:flex-row w-3/4 md:w-full md:space-x-3 space-y-3 md:space-y-0 justify-center w-full"
							onSubmit={(e) => {
								e.preventDefault();
								search()
							}}>
							<div className=" relative w-1/4">
								<select onChange={(e) => filterChangeHandler(e)}
										className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
									{filter.options.map(el => <option className={"py-2 px-4"} value={el.value}
																	  key={el.value}>{el.name}</option>)}
								</select>
							</div>
							<div className=" relative w-1/3">
								<input type="text" id="&quot;form-subscribe-Filter"
									   className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
									   placeholder="Search" value={searchText}
									   onChange={(e) => setSearchText(e.target.value)}/>
							</div>
							<div className=" relative w-1/4">
								<select onChange={(e) => searchByChangeHandler(e)}
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
									Email
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
									Status
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
									Action
								</th>
							</tr>
							</thead>
							<tbody>
							{data.map(el =>
										  <tr key={el.id}>
											  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
												  <Link href={`/${role}/students/${el.id}`}>
													  <div className="flex items-center cursor-pointer">
														  <div className="flex-shrink-0">
															  <img alt={el.fullName} src={el.image}
																   className="mx-auto object-cover rounded-full h-10 w-10 "/>
														  </div>
														  <div className="ml-3">
															  <p className="text-gray-900 whitespace-no-wrap">
																  {el.fullName}
															  </p>
														  </div>
													  </div>
												  </Link>
											  </td>
											  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
												  <p className="text-gray-900 whitespace-no-wrap">
													  {el.email}
												  </p>
											  </td>
											  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
												  {el.active ?
													  <span
														  className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
							<span aria-hidden="true"
								  className="absolute inset-0 bg-green-200 opacity-50 rounded-full"/>
							<span className="relative">
								active
							</span>
						</span> :
													  <span
														  className="relative inline-block px-3 py-1 font-semibold text-red-600 leading-tight">
							<span aria-hidden="true"
								  className="absolute inset-0 bg-red-200 opacity-50 rounded-full"/>
							<span className="relative">
								blocked
							</span>
						</span>}
											  </td>
											  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
												  {el.active ?
													  <button onClick={() => {
														  blockUserHandler(el.id)
													  }} type="button"
															  className="mx-auto py-2 px-7 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
														  Block
													  </button>
													  : <button onClick={() => {
														  unblockUserHandler(el.id)
													  }} type="button"
																className="mx-auto py-2 px-4 flex justify-center items-center  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
														  Unblock
													  </button>}
											  </td>
										  </tr>
							)}
							</tbody>
						</table>
						<div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
							<div className="flex items-center">
								<button onClick={toPreviousPage} type="button"
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
								<button onClick={toNextPage}type="button"
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

export default UsersTable;