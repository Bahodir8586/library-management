import React from 'react';
import axios from "axios";
import Signin from "../../components/shared/signin";
import {useRouter} from "next/router";
import withoutAuth from "../../HOCs/withoutAuth";

const SignIn=()=> {
	const router=useRouter()
	const handleSubmit = (e, username, password) => {
		e.preventDefault()
		console.log(username, password)
		axios.post(`https://systemm-library.herokuapp.com/api/auth/librarian/login`, {username, password})
			 .then(response => {
				 console.log(response)
				 localStorage.setItem("accessToken", response.data.token)
				 router.push("/librarian/profile")
			 }).catch(error => {
			console.log(error.response)
		})
	}

	return (

		<Signin handleSubmit={(e, username, password) => handleSubmit(e, username, password)}/>
	);
}

export default  withoutAuth(SignIn)