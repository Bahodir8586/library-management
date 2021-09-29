import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {toNextPage, toPreviousPage} from "../../utils/pagination";
import {changer} from "../../utils/filterChangers";
import axios from "../../utils/axios";
import SweetAlert from "react-bootstrap-sweetalert";
import SuccessModal from "../modals/successModal";
import FailModal from "../modals/failModal";

const ApplicationsTable = () => {
    const [data, setData] = useState([])
    const [searchBy, setSearchBy] = useState({
        value: "book",
        options: [
            {value: "book", name: "Book name"},
            {value: "user", name: "User name"},
        ]
    })
    const [searchText, setSearchText] = useState("")
    const [pageNumber, setPageNumber] = useState(1)

    const [haveNextPage, setHaveNextPage] = useState(true)
    const [selectedOrder, setSelectedOrder] = useState({})
    const [showRejectModal, setShowRejectModal] = useState(false)
    const [showAcceptModal, setShowAcceptModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showFailModal, setShowFailModal] = useState(false)
    const [errorText, setErrorText] = useState("")
    const [successText, setSuccessText] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        search()
    }, [searchBy.value, pageNumber])

    const search = () => {
        console.log(searchBy.value, searchText)
        axios.get(`/librarian/applications?searchBy=${searchBy.value}&searchText=${searchText}&page=${pageNumber}`).then(response => {
            console.log(response)
            setHaveNextPage(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    const acceptOrderHandler = (id) => {
        setShowAcceptModal(false)
        axios.post(`/librarian/order/accept/${id}`).then(response => {
            console.log(response)
            setSuccessText("Order successfully accepted")
            setShowSuccessModal(true)
        }).catch(error => {
            console.log(error)
            setErrorText("Something went wrong. Please try again later")
            setShowFailModal(true)
            //    FIXME: fix different error messages
        })
    }

    const finishAccept = () => {
        setSelectedOrder({})
        setShowAcceptModal(false)
    }

    const rejectOrderHandler = (id) => {
        setShowRejectModal(false)
        console.log(id, message)
        axios.post(`/librarian/order/reject/${id}`, {message}).then(response => {
            console.log(response)
            setSuccessText("Order successfully rejected")
            setShowSuccessModal(true)
        }).catch(error => {
            console.log(error)
            setErrorText("Something went wrong. Please try again later")
            setShowFailModal(true)
            //    FIXME: fix different error messages
        })
    }

    const finishReject = () => {
        setSelectedOrder({})
        setShowRejectModal(false)
        setMessage("")
    }

    return (
        <div className="container mx-auto px-4 sm:px-8 w-full">
            <SweetAlert
                showCancel
                show={showRejectModal}
                title={"Reason for reject"}
                confirmBtnCssClass="px-8 py-3 border border-red-600 bg-red-600 text-white rounded text-xl cursor-pointer hover:bg-red-700 transition duration-200"
                confirmBtnText="Reject"
                cancelBtnCssClass="px-6 py-3 border border-red-600 bg-white text-red-600 rounded text-xl cursor-pointer hover:bg-gray-100 transition duration-200"
                onConfirm={() => {
                    rejectOrderHandler(selectedOrder.id)
                    finishReject()
                }}
                onCancel={() => {
                    finishReject()
                }}
            >
				<textarea autoComplete={"off"} rows={5}
                          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-3/4 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                          placeholder="Message to user" value={message}
                          onChange={(e) => setMessage(e.target.value)}/>
            </SweetAlert>
            <SweetAlert
                showCancel
                show={showAcceptModal}
                title={"Accept order?"}
                confirmBtnCssClass="px-6 py-3 border border-green-600 bg-green-600 text-white rounded text-xl cursor-pointer hover:bg-green-700 transition duration-200"
                confirmBtnText="Accept"
                cancelBtnCssClass="px-6 py-3 border border-red-600 bg-white text-red-600 rounded text-xl cursor-pointer hover:bg-gray-100 transition duration-200"
                onConfirm={() => acceptOrderHandler(selectedOrder.id)}
                onCancel={() => finishAccept()}
            >
                Do you want to accept the order?
            </SweetAlert>
            <SuccessModal show={showSuccessModal} title={"Congratulations"}
                          onConfirm={() => {
                              setShowSuccessModal(false)
                          }} text={successText}/>
            <FailModal show={showFailModal} title={"Error"}
                       onConfirm={() => {
                           setShowFailModal(false)
                       }} text={errorText}/>
            <div className="py-8">
                <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full items-center">
                    <h2 className="text-6xl leading-tight w-1/6">
                        Applications
                    </h2>
                    <div className="text-end w-3/4">
                        <form
                            className="flex flex-col md:flex-row w-3/4 md:w-full md:space-x-3 space-y-3 md:space-y-0 justify-end items-end w-full"
                            onSubmit={(e) => {
                                e.preventDefault();
                                search()
                            }}>

                            <div className=" relative w-1/3">
                                <label className="text-gray-700 mr-3">
                                    Search:
                                </label>
                                <input type="text" id="&quot;form-subscribe-Filter"
                                       className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                       placeholder="Search" value={searchText}
                                       onChange={(e) => setSearchText(e.target.value)}/>
                            </div>

                            <div className=" relative w-1/4 px-4">
                                <label className="text-gray-700 mr-3">
                                    Search by:
                                </label>
                                <select onChange={(e) => setSearchBy(changer(searchBy, e.target.value))}
                                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                                    {searchBy.options.map(el => <option className={"py-2 px-4"} value={el.value}
                                                                        key={el.value}>{el.name}</option>)}
                                </select>
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
                                    User
                                </th>
                                <th scope="col"
                                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
                                    Book
                                </th>
                                <th scope="col"
                                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
                                    Book Wanted Get Date
                                </th>
                                <th scope="col"
                                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
                                    Duration
                                </th>
                                <th scope="col"
                                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map(el =>
                                <tr key={el.id} className={"bg-white"}>
                                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-center">
                                        <Link href={`/admin/users/${el.user.id}`}>
                                            <div className="flex items-center cursor-pointer justify-center">
                                                <p className="text-gray-900 whitespace-no-wrap text-center">
                                                    {el.user.name}
                                                </p>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-center">
                                        <Link href={`/admin/books/${el.book.id}`}>
                                            <div className="flex items-center cursor-pointer justify-center">
                                                <p className="text-gray-900 whitespace-no-wrap text-center">
                                                    {el.book.name}
                                                </p>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-center">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {el.wantedDate}
                                        </p>
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-center">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {el.duration} (days)
                                        </p>
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-center flex justify-center">
                                        <button onClick={() => {
                                            setSelectedOrder(el)
                                            setShowAcceptModal(true)
                                        }} type="button"
                                                className="mx-auto py-2 px-5 flex justify-center items-center  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                                            Accept
                                        </button>
                                        <button onClick={() => {
                                            setSelectedOrder(el)
                                            setShowRejectModal(true)
                                        }} type="button"
                                                className="mx-auto py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                            Reject
                                        </button>

                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                            <div className="flex items-center">
                                <button onClick={() => setPageNumber(toPreviousPage(pageNumber))} type="button"
                                        className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                                    <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                        </path>
                                    </svg>
                                </button>
                                <button type="button"
                                        className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 ">
                                    {pageNumber}
                                </button>
                                <button onClick={() => setPageNumber(toNextPage(pageNumber, haveNextPage))}
                                        type="button"
                                        className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">
                                    <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationsTable;
