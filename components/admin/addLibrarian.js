import React, {useState} from 'react';

const AddLibrarian = ({handleSubmit}) => {
	const [username, setUsername] = useState("")
	const [fullName, setFullName] = useState("")
	const [password, setPassword] = useState("")
	const [image, setImage] = useState(undefined)
	const [imgSrc, setImgSrc] = useState(undefined)


	const handleImageUpload = (e) => {
		const img = e.target.files[0];
		const url = URL.createObjectURL(img);
		setImgSrc(url);
		setImage(img);
	}

	return (
		<div className={"w-full text-center"}>
			<section className="bg-gray-100 bg-opacity-50 py-8">
				<form className="container max-w-2xl mx-auto shadow-md md:w-3/4" onSubmit={(e) => handleSubmit(e,username,fullName,password,image)}>
					<div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
						<div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0 ">
							<div className="max-w-sm mx-auto md:w-1/3">
								<img alt="" src={imgSrc ? imgSrc : "/images/books/book_1.jpg"}
									 className="mx-auto object-cover rounded-full h-24 w-24 "/>
							</div>
							<div className="max-w-sm mx-auto space-y-5 md:w-2/3">
								<input
									type="file"
									id="imgLibrarian"
									className="invisible"
									accept="image/*"
									onChange={(e) => handleImageUpload(e)}
								/>
								<div className=" relative text-center">
									<label htmlFor={"imgLibrarian"}
										   className="inline-flex py-2 px-4 flex justify-center items-center mx-auto bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer rounded-lg ">
										<svg width="20" height="20" fill="currentColor" className="mr-2"
											 viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
											<path
												d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z">
											</path>
										</svg>
										Upload
									</label>
								</div>
							</div>
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
											   placeholder="Full Name" value={fullName}
											   onChange={(e) => setFullName(e.target.value)}/>
									</div>
								</div>
								<div>
									<div className=" relative ">
										<input type="text" autoComplete={"off"}
											   className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
											   placeholder="Username" value={username}
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
										   placeholder="Password" value={password}
										   onChange={(e) => setPassword(e.target.value)}/>
								</div>
							</div>
						</div>
						<hr/>
						<div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
							<button type="submit" onClick={(e) => handleSubmit(e,username,fullName,password,image)}
									className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
								Save
							</button>
						</div>
					</div>
				</form>
			</section>
		</div>
	);
};

export default AddLibrarian;