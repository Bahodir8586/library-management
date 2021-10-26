import React, { useState, useMemo } from "react";
import Image from "next/image";
import SweetAlert from "react-bootstrap-sweetalert";

import WarningModal from "../modals/warningModal";

const AdminProfile = ({
  name,
  categories,
  handleSubmit,
  addCategory,
  editCategory,
  deleteCategory,
}) => {
  const [username, setUsername] = useState(name);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newName, setNewName] = useState("");

  const editCategoryHandler = (category) => {
    setShowEditModal(true);
    setSelectedCategory(category);
    setNewName(category.name);
  };
  const deleteCategoryHandler = (category) => {
    setShowDeleteModal(true);
    setSelectedCategory(category);
  };

  const finishEdit = () => {
    setShowEditModal(false);
    setSelectedCategory({});
    setNewName("");
  };
  const finishDelete = () => {
    setShowDeleteModal(false);
    setSelectedCategory({});
  };

  const editModal = useMemo(
    () => (
      <SweetAlert
        warning
        showCancel
        show={showEditModal}
        title={"Edit category"}
        confirmBtnCssClass="px-8 py-3 border border-green-600 bg-green-600 text-white rounded text-xl cursor-pointer hover:bg-green-700 transition duration-200"
        confirmBtnText="Save"
        cancelBtnCssClass="px-6 py-3 border border-red-600 bg-white text-red-600 rounded text-xl cursor-pointer hover:bg-gray-100 transition duration-200"
        onConfirm={() => {
          editCategory(selectedCategory.id, newName);
          finishEdit();
        }}
        onCancel={() => {
          finishEdit();
        }}
      >
        <input
          type="text"
          autoComplete={"off"}
          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-3/4 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Category name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </SweetAlert>
    ),
    [editCategory, newName, selectedCategory.id, showEditModal]
  );
  const warningModal = useMemo(
    () => (
      <WarningModal
        title={"Are you sure"}
        show={showDeleteModal}
        onConfirm={() => {
          deleteCategory(selectedCategory.id);
          finishDelete();
        }}
        onCancel={() => {
          finishDelete();
        }}
      >
        Do you want to delete category {selectedCategory.name}
      </WarningModal>
    ),
    [
      deleteCategory,
      selectedCategory.id,
      selectedCategory.name,
      showDeleteModal,
    ]
  );

  return (
    <div className={"w-full text-center"}>
      {editModal}
      {warningModal}
      <section className="bg-gray-100 bg-opacity-50 py-8 flex flex-wrap">
        <form
          className="container max-w-2xl mx-auto shadow-md md:w-3/4 mb-8"
          onSubmit={(e) =>
            handleSubmit(
              e,
              username,
              oldPassword,
              newPassword,
              confirmNewPassword
            )
          }
        >
          <div className="p-4 bg-gray-500 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0 ">
              <h1
                className={"text-center text-2xl text-medium text-black w-full"}
              >
                Welcome{" "}
                <span
                  className={"text-bold text-3xl text-purple-700 capitalize"}
                >
                  {name}
                </span>
              </h1>
            </div>
          </div>
          <div className="space-y-6 bg-white">
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">Personal info</h2>
              <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                <div>
                  <div className=" relative ">
                    <input
                      type="text"
                      autoComplete={"off"}
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Username"
                      value={username ?? name}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">Password</h2>
              <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                <div className=" relative ">
                  <input
                    type="password"
                    autoComplete={"off"}
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className=" relative ">
                  <input
                    type="password"
                    autoComplete={"off"}
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className=" relative ">
                  <input
                    type="password"
                    autoComplete={"off"}
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
              <button
                type="submit"
                onClick={(e) =>
                  handleSubmit(
                    e,
                    username,
                    oldPassword,
                    newPassword,
                    confirmNewPassword
                  )
                }
                className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
              >
                Save
              </button>
            </div>
          </div>
        </form>
        <div className="container max-w-2xl mx-auto shadow-md md:w-3/4">
          <div className="p-4 bg-gray-500 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0 ">
              <h1
                className={"text-center text-2xl text-medium text-black w-full"}
              >
                Categories
              </h1>
            </div>
          </div>
          <div className="bg-white">
            <div className="my-4 items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">New Category</h2>
              <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                <div className={"flex justify-between"}>
                  <div className=" relative w-full mr-6">
                    <input
                      type="text"
                      autoComplete={"off"}
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Category name"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={(e) => {
                      addCategory(e, newCategory);
                      setNewCategory("");
                    }}
                    className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <ul
              className="divide-y divide-gray-200 overflow-y-auto h-80"
              style={{ marginTop: 0 + "px!important" }}
            >
              {categories.map((el, index) => (
                <li key={el.id} className="px-4 py-4 flex justify-between">
                  <div className={"w-1/6"}>{index + 1}</div>
                  <div className={"w-2/3"}>{el.name}</div>
                  <div
                    className={"w-1/12 cursor-pointer"}
                    onClick={() => editCategoryHandler(el)}
                  >
                    <Image
                      src={"/svgs/edit.svg"}
                      alt="edit"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div
                    className={"w-1/12 cursor-pointer"}
                    onClick={() => deleteCategoryHandler(el)}
                  >
                    <Image
                      src={"/svgs/delete.svg"}
                      alt="delete"
                      width={24}
                      height={24}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminProfile;
