import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

const withAuth = (WrappedComponent) => {
	return (props) => {
		const Router = useRouter();
		const [verified, setVerified] = useState(false);

		useEffect(() => {
			const accessToken = localStorage.getItem("accessToken");
			// if no accessToken was found,then we redirect to "/" page.
			if (!accessToken) {
				Router.replace("/");
			} else {
				//FIXME: remove this
				setVerified(true)
				// we call the api that verifies the token.
				axios.get(`https://systemm-library.herokuapp.com/api/verifyToken`, {headers: {"Authorization": `Bearer ${accessToken}`}}).then(response => {
					console.log(response)
					if (response.data.verified && Router.asPath.split("/")[1]===response.data.role) {
						// if token was verified we set the state.
						setVerified(response.data.verified);
					} else {
						// If the token was fraud we first remove it from localStorage and then redirect to "/"
						localStorage.removeItem("accessToken");
						Router.replace("/");
					}
				}).catch(error => {
					console.log(error)
					localStorage.removeItem("accessToken");
					Router.replace("/");
				})
			}
		}, []);

		if (verified) {
			return <WrappedComponent {...props} />;
		} else {
			return null;
		}
	};
};

export default withAuth;