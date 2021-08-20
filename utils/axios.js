import React from "react";
import axios from "axios";

const instance = axios.create({
								  baseURL: "https://systemm-library.herokuapp.com/api/",
							  });
instance.defaults.headers.common["Authorization"]=localStorage.getItem("accessToken")

export default instance;