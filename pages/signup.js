import React, {useState} from 'react';
import Link from "next/link"
import axios from "axios";
import {useRouter} from "next/router";

export default function SignUp() {
    const router=useRouter()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username,setUsername]=useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation]=useState("")


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(firstName, lastName, email, password)
        axios.post(`https://systemm-library.herokuapp.com/api/auth/user/register`, {
            name:`${firstName} ${lastName}`,
            username: username,
            email,
            password,
            password_confirmation: passwordConfirmation
        })
            .then(response => {
                console.log(response)
                localStorage.setItem("accessToken",response.data.token)
                router.push("/user/profile")
            }).catch(error => {
            console.log(error.response)
        })
    }

    return (
        <div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
                Create a new account
            </div>
            <div className="p-6 mt-0">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex gap-4 mb-2">
                        <div className=" relative ">
                            <input type="text"
                                   className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                   name="First name" placeholder="First name" value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)}/>
                        </div>
                        <div className=" relative ">
                            <input type="text"
                                   className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                   name="Last name" placeholder="Last name" value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <div className=" relative ">
                            <input type="text"
                                   className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                   name="email" placeholder="Email" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <div className=" relative ">
                            <input type="text"
                                   className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                   name="username" placeholder="Username" value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <div className=" relative ">
                            <input type="password"
                                   className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                   name="password" placeholder="Password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <div className=" relative ">
                            <input type="password"
                                   className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                   name="password" placeholder="Password Confirmation" value={passwordConfirmation}
                                   onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex w-full my-4">
                        <button type="submit"
                                className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Register
                        </button>
                    </div>
                </form>
                <div>
                    <div className="flex items-center justify-center mt-6">
                        <Link href={"/signin"}>
                            <a
                                className="inline-flex items-center text-sm font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white hover:underline">
                    <span className="ml-2">
                        Already have an account ?
                    </span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}
