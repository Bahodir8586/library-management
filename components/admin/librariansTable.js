import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import WarningModal from "../modals/warningModal";
import axios from "../../utils/axios";
import SuccessModal from "../modals/successModal";
import Spinner from "../loaders/spinner/spinner";
import FailModal from "../modals/failModal";

const LibrariansTable = (props) => {
    const router = useRouter()
    const [data, setData] = useState([
        {
            id: 1,
            image: "/url",
            fullName: "Abdullayev Bahodir",
            username: "Abdullayev123",
            finishedOrders: 412,
            allOrders: 419,
            inDebtOrders: 1,
        },
        {
            id: 2,
            image: "/url",
            fullName: "Nosirov Mirfayz",
            username: "Nosirov446",
            finishedOrders: 0,
            allOrders: 19,
            inDebtOrders: 6,
        },
        {
            id: 3,
            image: "/url",
            fullName: "O'ralov Shahzod",
            username: "ShahzodLibrarian",
            finishedOrders: 93,
            allOrders: 125,
            inDebtOrders: 6,
        },
        {
            id: 4,
            image: "/url",
            fullName: "Qobilov Xurshidbek",
            username: "Kabilov",
            finishedOrders: 18,
            allOrders: 35,
            inDebtOrders: 0,
        }
    ])
    const [sort, setSort] = useState({
        value: "alphabet",
        options: [
            {value: "alphabet", name: "A-Z"},
            {value: "numberOfOrders", name: "Number of Orders"},
            {value: "finishingRate", name: "Finished Orders Rate"},
            {value: "inDebtOrders", name: "In Debt Orders"}
        ]
    })
    const [searchText, setSearchText] = useState("")
    const [selectedLibrarian, setSelectedLibrarian] = useState({})

    const [isLoading, setIsLoading] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [successText, setSuccessText] = useState("")
    const [showFailModal, setShowFailModal]=useState(false)
    const [errorText, setErrorText]=useState("")

    const sortChangeHandler = (e) => {
        const newSort = {...sort};
        newSort.value = e.target.value;
        setSort(newSort)
    }

    useEffect(() => {
        search()
    }, [sort.value])

    const search = () => {
        setIsLoading(true)
        axios.get(`/admin/librarians/?sort=${sort.value}&searchText=${searchText}`).then((response) => {
            console.log(response.data)
            setData(response.data)
            setIsLoading(false)
        }).catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }
    const editLibrarianHandler = (id) => {
        router.push(`/admin/librarians/${id}`).then().catch(error => {
            console.log(error)
            router.reload()
        })
    }
    const deleteLibrarianHandler = (id) => {
        setIsLoading(true)
        axios.delete(`/admin/librarians/${id}`).then(response => {
            console.log(response)
            setShowSuccessModal(true)
            setSuccessText(`Librarian successfully deleted`)
            setIsLoading(false)
        }).catch(error => {
            console.log(error)
            setIsLoading(false)
            setErrorText("Something went wrong. Please try again later")
            setShowFailModal(true)
            //	TODO: show different error messages according to condition
        })
    }
    const finishDelete = () => {
        setShowDeleteModal(false)
        setSelectedLibrarian({})
    }

    return (
        <div className="container mx-auto px-4 sm:px-8 w-full">
            <WarningModal
                title={"Are you sure"}
                show={showDeleteModal}
                onConfirm={() => {
                    deleteLibrarianHandler(selectedLibrarian.id)
                    finishDelete()
                }}
                onCancel={() => {
                    finishDelete()
                }}>
                Do you want to delete librarian {selectedLibrarian.id}
            </WarningModal>
            <SuccessModal show={showSuccessModal} title={"Congratulations"} onConfirm={() => {
                search()
                setShowSuccessModal(false)
            }} text={successText}/>
            <FailModal show={showFailModal} title={"Error"} onConfirm={() => {
                // search()
                setErrorText("")
                setShowFailModal(false)
            }} text={errorText}/>
            {isLoading ? <Spinner/> : <div className="py-8">
                <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full items-center">
                    <h2 className="text-6xl leading-tight w-1/6">
                        Librarians
                    </h2>
                    <div className={"w-1/6 text-center"}>
                        <button
                            className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200"
                            type="button" onClick={() => router.push("/admin/librarians/add")}>
                            Add librarian
                        </button>
                    </div>
                    <div className="text-end w-3/4">
                        <form
                            className="flex flex-col md:flex-row w-3/4 md:w-full md:space-x-3 space-y-3 md:space-y-0 justify-end w-full"
                            onSubmit={(e) => {
                                e.preventDefault();
                                search()
                            }}>
                            <div className=" relative w-1/4 px-4">
                                <select onChange={(e) => sortChangeHandler(e)}
                                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                                    {sort.options.map(el => <option className={"py-2 px-4"} value={el.value}
                                                                    key={el.value}>{el.name}</option>)}
                                </select>
                            </div>
                            <div className=" relative w-1/3">
                                <input type="text" id="&quot;form-subscribe-Filter"
                                       className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                       placeholder="Search" value={searchText}
                                       onChange={(e) => setSearchText(e.target.value)}/>
                            </div>
                            <div className={"w-1/6 text-center"}>
                                <button
                                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                                    type="button" onClick={search}>
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                            <tr>
                                <th scope="col"
                                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
                                    Librarian
                                </th>
                                <th scope="col"
                                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
                                    Username
                                </th>
                                <th scope="col"
                                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
                                    Finished orders
                                </th>
                                <th scope="col"
                                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
                                    All orders
                                </th>
                                <th scope="col"
                                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
                                    In debt orders
                                </th>
                                <th scope="col"
                                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map(el =>
                                <tr key={el.id}>
                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
                                        <Link href={`/admin/librarians/${el.id}`}>
                                            <div className="flex items-center cursor-pointer">
                                                <div className="flex-shrink-0">
                                                    <img alt={el.fullName} src={el.image}
                                                         className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {el.fullName}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {el.username}
                                        </p>
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
                                        <p className="text-gray-900 whitespace-no-wrap text-green-600 font-medium text-lg">
                                            {el.finishedOrders}
                                        </p>
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
                                        <p className="text-gray-900 whitespace-no-wrap text-yellow-600 text-lg">
                                            {el.allOrders}
                                        </p>
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
                                        <p className="text-gray-900 whitespace-no-wrap text-red-600 font-medium text-lg">
                                            {el.inDebtOrders}
                                        </p>
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center flex justify-center">
                                        <button onClick={() => {
                                            editLibrarianHandler(el.id)
                                        }} type="button"
                                                className="mx-3 py-2 px-9 flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                                            Edit
                                        </button>
                                        <button onClick={() => {
                                            setSelectedLibrarian(el)
                                            setShowDeleteModal(true)
                                        }} type="button"
                                                className="mx-3 py-2 px-7 flex justify-center items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default LibrariansTable;
