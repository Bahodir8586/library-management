import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

// 1) Check if there is no token: allow to enter login page
// 2) If there is token check is it valid or invalid
// 3) If token is valid do not allow to enter login page
// 4) If token is invalid allow user to enter login page
const withoutAuth = (WrappedComponent) => {
	return (props) => {
		const router = useRouter();
		const [allowed, setAllowed]=useState(false)

		useEffect(() => {
			const accessToken = localStorage.getItem("accessToken");
			// if no accessToken was found,then we allow to enter login page.
			if (!accessToken) {
				setAllowed(true);
			} else {
				// we call the api that verifies the token.
				axios.get(`https://systemm-library.herokuapp.com/api/verifyToken`, {headers: {"Authorization": `Bearer ${accessToken}`}}).then(response => {
					console.log(response)
					if (response.data.verified) {
						// if token was verified we set the state.
						setAllowed(false)
						router.push(`${response.data.role}/profile`)
					} else {
						// If the token was fraud we first remove it from localStorage and then allow user to enter login page
						localStorage.removeItem("accessToken");
						setAllowed(true)
					}
				}).catch(error => {
					console.log(error)
					localStorage.removeItem("accessToken");
					setAllowed(true)
				})
			}
		}, []);

		if (allowed) {
			return <WrappedComponent {...props} />;
		} else {
			return null
		}
	};
};

export default withoutAuth;
