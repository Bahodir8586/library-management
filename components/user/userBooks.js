import React, { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import axios from "../../utils/axios";
import {
  isPaginated,
  toNextPage,
  toPreviousPage,
} from "../../utils/pagination";
import { changer } from "../../utils/filterChangers";
import InputRange from "../shared/inputRange/inputRange";

const UserBooks = ({ books }) => {
  const router = useRouter();
  const [data, setData] = useState(books);
  const [filter, setFilter] = useState({
    value: "all",
    options: [
      { value: "all", name: "All" },
      { value: "romantic", name: "Romantic" },
      { value: "detective", name: "Detective" },
      { value: "politics", name: "Politics" },
      { value: "fantastic", name: "Fantastic" },
    ],
  });
  const [sort, setSort] = useState({
    value: "alphabet",
    options: [
      { value: "alphabet", name: "A-Z" },
      { value: "publishedYear", name: "Published Year" },
    ],
  });
  const [searchBy, setSearchBy] = useState({
    value: "name",
    options: [
      { value: "name", name: "Name" },
      { value: "author", name: "Author" },
      { value: "isbn", name: "ISBN" },
    ],
  });
  const [searchText, setSearchText] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [haveNextPage, setHaveNextPage] = useState(true);
  const [fromYear, setFromYear] = useState(1950);
  const [toYear, setToYear] = useState(2020);

  useEffect(() => {
    search();
  }, [
    filter.value,
    searchBy.value,
    sort.value,
    pageNumber,
    onlyAvailable,
    search,
  ]);

  const search = useCallback(
    (e) => {
      console.log(
        filter.value,
        searchText,
        searchBy.value,
        sort.value,
        fromYear,
        toYear,
        pageNumber
      );
      axios
        .get(
          `/books?filter=${filter.value}&searchText=${searchText}&searchBy=${searchBy.value}&sort=${sort.value}&onlyAvailable=${onlyAvailable}&fromYear=${fromYear}&toYear=${toYear}&page=${pageNumber}`
        )
        .then((response) => {
          console.log(response.data.data);
          setHaveNextPage(isPaginated(response.data));
          setData(response.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [
      filter.value,
      fromYear,
      onlyAvailable,
      pageNumber,
      searchBy.value,
      searchText,
      sort.value,
      toYear,
    ]
  );

  return (
    <div className="w-full bg-white p-12">
      <div className="header flex items-end justify-between mb-12 flex-wrap">
        <div className="title w-1/12 opacity-0">
          <p className="text-6xl font-bold text-gray-800 mb-4">Library</p>
        </div>
        <div className="text-end w-11/12">
          <form
            className="flex flex-col flex-wrap items-center md:flex-row md:w-full md:space-x-3 space-y-3 md:space-y-0 justify-center w-full"
            onSubmit={(e) => {
              e.preventDefault();
              search();
            }}
          >
            <div className=" relative w-1/4 px-4">
              <label className="text-gray-700 mr-3">Search by:</label>
              <select
                onChange={(e) => setSearchBy(changer(searchBy, e.target.value))}
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                {searchBy.options.map((el) => (
                  <option
                    className={"py-2 px-4"}
                    value={el.value}
                    key={el.value}
                  >
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <div className=" relative w-1/3 px-4">
              <label className="text-gray-700 mr-3">Search:</label>
              <input
                type="text"
                id='"form-subscribe-Filter'
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className=" relative w-1/4 px-4">
              <label className="text-gray-700 mr-3">Sort by:</label>
              <select
                onChange={(e) => setSort(changer(sort, e.target.value))}
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                {sort.options.map((el) => (
                  <option
                    className={"py-2 px-4"}
                    value={el.value}
                    key={el.value}
                  >
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={"pt-4 relative w-1/4 px-4"}>
              <label className="text-gray-700 mr-3">From: {fromYear}</label>
              <InputRange
                min={0}
                max={121}
                step={1}
                initValue={50}
                onChange={(val) => {
                  setFromYear(1900 + +val);
                }}
              />
              <div className="flex justify-between mt-2 text-xs text-gray-600">
                <span className="w-8 text-left">1900</span>
                <span className="w-8 text-right">2021</span>
              </div>
            </div>
            <div className={"pt-4 relative w-1/4 px-4"}>
              <label className="text-gray-700 mr-3">To: {toYear}</label>
              <InputRange
                min={0}
                max={121}
                step={1}
                initValue={120}
                onChange={(val) => {
                  setToYear(1900 + +val);
                }}
              />
              <div className="flex justify-between mt-2 text-xs text-gray-600">
                <span className="w-8 text-left">1900</span>
                <span className="w-8 text-right">2021</span>
              </div>
            </div>
            <div className={"pt-4 relative w-1/6 px-4"}>
              <label className={"text-gray-700 mr-3"}>Filter:</label>
              <select
                onChange={(e) => setFilter(changer(filter, e.target.value))}
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                {filter.options.map((el) => (
                  <option
                    className={"py-2 px-4"}
                    value={el.value}
                    key={el.value}
                  >
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <div
              className={
                "pt-4 relative w-1/4 px-4 flex items-center justify-around"
              }
            >
              <div className="mt-4">
                <span className="text-gray-700 font-medium">
                  Only available
                </span>
                <div className="relative inline-block w-10 ml-2 align-middle select-none">
                  <input
                    type="checkbox"
                    name="onlyAvailable"
                    id="onlyAvailable"
                    onChange={() => setOnlyAvailable(!onlyAvailable)}
                    className="checked:bg-purple-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="onlyAvailable"
                    className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
              </div>
              <div className={"text-center mt-4"}>
                <button
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  type="button"
                  onClick={search}
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
        {data.length &&
          data.map((el) => (
            <Link key={el.id} href={`/user/books/${el.id}`} passHref={true}>
              <div
                className={`overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto`}
              >
                <a href="#" className="w-full block h-full">
                  <img
                    alt={el.name}
                    src={el.image}
                    className="max-h-40 w-full object-cover"
                  />
                  <div
                    className={`dark:bg-gray-800 w-full p-4 ${
                      el.count === 0 ? "bg-red-50" : "bg-white"
                    }`}
                  >
                    <div className={"flex justify-between"}>
                      <p className="text-indigo-500 text-md font-medium">
                        {el.name}
                      </p>
                      <span className={""}>
                        {el.count ? (
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            />
                            <span className="relative">Available</span>
                          </span>
                        ) : (
                          <span className="relative inline-block px-3 py-1 font-semibold text-red-600 leading-tight">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                            />
                            <span className="relative">Unavailable</span>
                          </span>
                        )}
                      </span>
                    </div>
                    <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                      {el.author}
                    </p>
                    <p className="text-gray-400 dark:text-gray-300 font-light text-md">
                      {el.description.slice(0, 80)}...
                    </p>
                    <div className="flex items-center mt-4">
                      <p className="text-gray-800 dark:text-white text-sm">
                        Published year: {el.publishedYear}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </Link>
          ))}
      </div>
      <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setPageNumber(toPreviousPage(pageNumber))}
            type="button"
            className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
          >
            <svg
              width="9"
              fill="currentColor"
              height="8"
              className=""
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
            </svg>
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 "
          >
            {pageNumber}
          </button>
          <button
            onClick={() => setPageNumber(toNextPage(pageNumber, haveNextPage))}
            type="button"
            className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
          >
            <svg
              width="9"
              fill="currentColor"
              height="8"
              className=""
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserBooks;
