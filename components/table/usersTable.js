import React, {useEffect, useState} from 'react';

const UsersTable = () => {
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
		console.log(filter.value, searchText, searchBy.value)
	}

	useEffect(() => {
		search()
	}, [filter.value, searchBy.value])

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
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
									User
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
									Role
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
									Created at
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
									status
								</th>
								<th scope="col"
									className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
								</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<div className="flex items-center">
										<div className="flex-shrink-0">
											<a href="#" className="block relative">
												<img alt="profil" src="/images/person/8.jpg"
													 className="mx-auto object-cover rounded-full h-10 w-10 "/>
											</a>
										</div>
										<div className="ml-3">
											<p className="text-gray-900 whitespace-no-wrap">
												Jean marc
											</p>
										</div>
									</div>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">
										Admin
									</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">
										12/09/2020
									</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span
										className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden="true"
											  className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                        </span>
                                        <span className="relative">
                                            active
                                        </span>
                                    </span>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<a href="#" className="text-indigo-600 hover:text-indigo-900">
										Edit
									</a>
								</td>
							</tr>
							<tr>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<div className="flex items-center">
										<div className="flex-shrink-0">
											<a href="#" className="block relative">
												<img alt="profil" src="/images/person/9.jpg"
													 className="mx-auto object-cover rounded-full h-10 w-10 "/>
											</a>
										</div>
										<div className="ml-3">
											<p className="text-gray-900 whitespace-no-wrap">
												Marcus coco
											</p>
										</div>
									</div>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">
										Designer
									</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">
										01/10/2012
									</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span
										className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden="true"
											  className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                        </span>
                                        <span className="relative">
                                            active
                                        </span>
                                    </span>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<a href="#" className="text-indigo-600 hover:text-indigo-900">
										Edit
									</a>
								</td>
							</tr>
							<tr>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<div className="flex items-center">
										<div className="flex-shrink-0">
											<a href="#" className="block relative">
												<img alt="profil" src="/images/person/10.jpg"
													 className="mx-auto object-cover rounded-full h-10 w-10 "/>
											</a>
										</div>
										<div className="ml-3">
											<p className="text-gray-900 whitespace-no-wrap">
												Ecric marc
											</p>
										</div>
									</div>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">
										Developer
									</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">
										02/10/2018
									</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span
										className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden="true"
											  className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                        </span>
                                        <span className="relative">
                                            active
                                        </span>
                                    </span>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<a href="#" className="text-indigo-600 hover:text-indigo-900">
										Edit
									</a>
								</td>
							</tr>
							<tr>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<div className="flex items-center">
										<div className="flex-shrink-0">
											<a href="#" className="block relative">
												<img alt="profil" src="/images/person/6.jpg"
													 className="mx-auto object-cover rounded-full h-10 w-10 "/>
											</a>
										</div>
										<div className="ml-3">
											<p className="text-gray-900 whitespace-no-wrap">
												Julien Huger
											</p>
										</div>
									</div>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">
										User
									</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">
										23/09/2010
									</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span
										className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden="true"
											  className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                        </span>
                                        <span className="relative">
                                            active
                                        </span>
                                    </span>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<a href="#" className="text-indigo-600 hover:text-indigo-900">
										Edit
									</a>
								</td>
							</tr>
							</tbody>
						</table>
						<div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
							<div className="flex items-center">
								<button type="button"
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
									1
								</button>
								<button type="button"
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