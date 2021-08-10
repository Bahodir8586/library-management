import axios from "axios";

const instance = axios.create({
								  baseURL: "https://secret-library.herokuapp.com/",
							  });

export default instance;