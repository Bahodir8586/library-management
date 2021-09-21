import React, {useState} from 'react';
import SweetAlert from "react-bootstrap-sweetalert";

const Book = ({name, image, author, publishedYear, description, categories, count, orderBook}) => {
    const [showOrderModal, setShowOrderModal] = useState(false)
    const [date, setDate] = useState({})
    const [duration, setDuration] = useState(14)
    return (
        <div className={"container max-w-2xl mx-auto shadow-md md:w-3/4 bg-opacity-50 bg-yellow-100 p-4 rounded-lg"}>
            <SweetAlert
                showCancel
                show={showOrderModal}
                title={"Order Book"}
                confirmBtnCssClass="px-8 py-3 border border-green-600 bg-green-600 text-white rounded text-xl cursor-pointer hover:bg-green-700 transition duration-200"
                confirmBtnText="Order"
                cancelBtnCssClass="px-6 py-3 border border-red-600 bg-white text-red-600 rounded text-xl cursor-pointer hover:bg-gray-100 transition duration-200"
                onConfirm={() => {
                    setShowOrderModal(false)
                    orderBook(date, duration)
                }}
                onCancel={() => {
                    setShowOrderModal(false)
                }}
            >
                <div className={"px-12 mb-4"}>
                    <label className={"block text-lg font-medium text-gray-700 text-left mb-1"}>Duration</label>
                    <input autoComplete={"off"} type={"text"}
                           className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                           placeholder="Duration" value={duration} onChange={(e) => setDuration(+e.target.value)}/>
                </div>
                <div className={"px-12"}>
                    <label className={"block text-lg font-medium text-gray-700 text-left mb-1"}>Get Date</label>
                    <input autoComplete={"off"} type={"date"}
                           className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                           placeholder="Duration" value={date} onChange={(e) => setDate(e.target.value)}/>
                </div>

            </SweetAlert>
            <h1 className={"text-center text-3xl mb-3 font-semibold"}>{name}</h1>
            <div className={"flex"}>
                <div className={"w-3/4 h-full px-4"}>
                    <img src={image} alt={name} className={"object-cover"}/>
                </div>
                <div className={"w-full px-4 py-6"}>
                    <div className={"mb-2"}>Author: <span className={"capitalize font-semibold text-xl"}>{author}</span></div>
                    <div className={"mb-2"}>Published Year:  <span className={"capitalize font-semibold text-xl"}>{publishedYear}</span></div>
                    <div>Categories: {categories?.length>0?categories.map(({id, name}) => <span className={"px-4 py-1 mx-1 text-base rounded-full text-white  bg-indigo-500 "} key={id}>{name}</span>):<span className={"capitalize font-semibold text-xl text-red-600"}>No category</span>}</div>
                </div>
            </div>
            <p className={"text-sm px-12 mt-4"}>
                {description}
            </p>
            <div className={"text-center mt-6"}>
                <button
                    className={`flex-shrink-0 px-4 py-2 text-base font-semibold text-white rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-offset-2  ${count < 1 ? "focus:ring-green-500 bg-green-500 hover:bg-green-700 focus:ring-offset-green-200" : "focus:ring-red-500 bg-red-500 hover:bg-red-700 focus:ring-offset-red-200"}`}
                    onClick={() => setShowOrderModal(true)} disabled={count > 1}>Order book
                </button>
            </div>
        </div>
    );
};

export default Book;
