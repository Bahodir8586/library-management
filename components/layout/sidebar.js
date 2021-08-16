import React, {useEffect, useState} from 'react';
import Link from "next/link"
import {useRouter} from "next/router";

const Sidebar = () => {
	const router=useRouter()
	const navbar = [
		{
			role: "admin",
			links: [
				{url: "/admin/profile", name: "Profile"},
				{url: "/admin/librarians", name: "Librarians"},
				{url: "/admin/users", name: "Users"},
				{url: "/admin/books", name: "Books"},
				{url: "/admin/orders", name: "Orders"},
			]
		},
		{
			role: "librarian",
			links: [
				{url: "/librarian/profile", name:"Profile"},
				{url: "/librarian/applications", name: "Applications"},
				{url: "/librarian/users", name: "Users"},
				{url: "/librarian/books", name: "Books"},
				{url: "/librarian/orders", name: "Orders"},
			]
		},
		{
			role: "user",
			links: [
				{url: "/user/profile", name: "Profile"},
				{url: "/user/books", name: "Books"},
				{url: "/user/orders", name: "Orders"},
			]
		}
	]
	const [role, setRole] = useState("admin")
	const [currentRoute,setCurrentRoute]=useState(`/${role}/profile`)

	useEffect(()=>{
		setCurrentRoute(router.asPath)
	},[router.asPath])

	return (
		<div className="h-screen hidden lg:block my-4 ml-4 shadow-lg relative w-80">
			<div className="bg-white h-full rounded-2xl dark:bg-gray-700">
				<div className="flex items-center justify-center pt-6">
					<svg width="35" height="30" viewBox="0 0 256 366" version="1.1"
						 preserveAspectRatio="xMidYMid">
						<defs>
							<linearGradient x1="12.5189534%" y1="85.2128611%" x2="88.2282959%"
											y2="10.0225497%" id="linearGradient-1">
								<stop stopColor="#FF0057" stopOpacity="0.16" offset="0%">
								</stop>
								<stop stopColor="#FF0057" offset="86.1354%">
								</stop>
							</linearGradient>
						</defs>
						<g>
							<path
								d="M0,60.8538006 C0,27.245261 27.245304,0 60.8542121,0 L117.027019,0 L255.996549,0 L255.996549,86.5999776 C255.996549,103.404155 242.374096,117.027222 225.569919,117.027222 L145.80812,117.027222 C130.003299,117.277829 117.242615,130.060011 117.027019,145.872817 L117.027019,335.28252 C117.027019,352.087312 103.404567,365.709764 86.5997749,365.709764 L0,365.709764 L0,117.027222 L0,60.8538006 Z"
								fill="#001B38">
							</path>
							<circle fill="url(#linearGradient-1)"
									transform="translate(147.013244, 147.014675) rotate(90.000000) translate(-147.013244, -147.014675) "
									cx="147.013244" cy="147.014675" r="78.9933938">
							</circle>
							<circle fill="url(#linearGradient-1)" opacity="0.5"
									transform="translate(147.013244, 147.014675) rotate(90.000000) translate(-147.013244, -147.014675) "
									cx="147.013244" cy="147.014675" r="78.9933938">
							</circle>
						</g>
					</svg>
				</div>
				<nav className="mt-6">
					<div>
						{navbar.find((el) => el.role === role).links.map(el => <Link href={el.url} key={el.url}>
							<a className={`w-full font-thin uppercase flex items-center p-4 my-2 transition-colors duration-200
							justify-start ${el.url===currentRoute ?
								"text-blue-500 bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500 dark:from-gray-700 dark:to-gray-800\n" +
								"border-r-4 border-blue-500" :
								"text-gray-500 dark:text-gray-200 hover:text-blue-500"}`}>
										<span className="text-left">
											<svg width="20" height="20" fill="currentColor" viewBox="0 0 2048 1792"
												 xmlns="http://www.w3.org/2000/svg">
												<path
													d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z">
												</path>
											</svg>
										</span>
								<span className="mx-4 text-sm font-normal">
											{el.name}
										</span>
							</a>
						</Link>)}
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Sidebar;