import React, {useState} from 'react';

const AdminProfile = ({name,categories, handleSubmit, addCategory}) => {
	const [username, setUsername] = useState(name)
	const [oldPassword, setOldPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [confirmNewPassword, setConfirmNewPassword] = useState("")
	const [newCategory, setNewCategory] = useState("")

	return (
		<div className={"w-full text-center"}>
			<section className="bg-gray-100 bg-opacity-50 py-8 flex">
				<form className="container max-w-2xl mx-auto shadow-md md:w-3/4"
					  onSubmit={(e) => handleSubmit(e, username, oldPassword, newPassword, confirmNewPassword)}>
					<div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
						<div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0 ">
							<h1 className={"text-center text-2xl text-medium text-black w-full"}>Welcome <span
								className={"text-bold text-3xl text-purple-700"}>{username}</span></h1>
						</div>
					</div>
					<div className="space-y-6 bg-white">
						<div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
							<h2 className="max-w-sm mx-auto md:w-1/3">
								Personal info
							</h2>
							<div className="max-w-sm mx-auto space-y-5 md:w-2/3">
								<div>
									<div className=" relative ">
										<input type="text" autoComplete={"off"}
											   className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
											   placeholder="Full Name" value={username}
											   onChange={(e) => setUsername(e.target.value)}/>
									</div>
								</div>
							</div>
						</div>
						<hr/>
						<div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
							<h2 className="max-w-sm mx-auto md:w-1/3">
								Password
							</h2>
							<div className="max-w-sm mx-auto space-y-5 md:w-2/3">
								<div className=" relative ">
									<input type="password" autoComplete={"off"}
										   className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										   placeholder="Old Password" value={oldPassword}
										   onChange={(e) => setOldPassword(e.target.value)}/>
								</div>
								<div className=" relative ">
									<input type="password" autoComplete={"off"}
										   className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										   placeholder="New Password" value={newPassword}
										   onChange={(e) => setNewPassword(e.target.value)}/>
								</div>
								<div className=" relative ">
									<input type="password" autoComplete={"off"}
										   className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										   placeholder="Confirm New Password" value={confirmNewPassword}
										   onChange={(e) => setConfirmNewPassword(e.target.value)}/>
								</div>
							</div>
						</div>
						<hr/>
						<div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
							<button type="submit" onClick={(e) => handleSubmit(e, username, oldPassword, newPassword,
																			   confirmNewPassword)}
									className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
								Save
							</button>
						</div>
					</div>
				</form>
				<div className="container max-w-2xl mx-auto shadow-md md:w-3/4">
					<div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
						<div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0 ">
							<h1 className={"text-center text-2xl text-medium text-black w-full"}>Categories</h1>
						</div>
					</div>
					<div className="space-y-6 bg-white">
						<div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
							<h2 className="max-w-sm mx-auto md:w-1/3">
								New Category
							</h2>
							<div className="max-w-sm mx-auto space-y-5 md:w-2/3">
								<div className={"flex justify-between"}>
									<div className=" relative w-full mr-6">
										<input type="text" autoComplete={"off"}
											   className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
											   placeholder="Category name" value={newCategory}
											   onChange={(e) => setNewCategory(e.target.value)}/>
									</div>
									<button type="submit" onClick={(e) => addCategory(e, newCategory)}
											className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
										+
									</button>
								</div>

							</div>
						</div>
						<hr/>
						<ul className="divide-y divide-gray-200">
							{categories.map((el) => (
								<li key={el.id} className="px-4 py-4 sm:px-0">
									{el.name}
								</li>
							))}
						</ul>
					</div>
				</div>

			</section>
		</div>
	);
};

export default AdminProfile;