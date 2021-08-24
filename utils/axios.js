import React from "react";
import axios from "axios";

const instance = axios.create({
								  baseURL: "https://systemm-library.herokuapp.com/api/",
							  });
instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);
export default instance;