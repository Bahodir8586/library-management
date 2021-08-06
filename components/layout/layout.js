import React from 'react';
import Sidebar from "../sidebar";
import Header from "../header/header";

const Layout = (props) => {
	return (
		<main className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-screen overflow-hidden relative">
			<div className="flex items-start justify-between">
				<Sidebar/>
				<Header/>
				{props.children}
			</div>
		</main>
	);
};

export default Layout;