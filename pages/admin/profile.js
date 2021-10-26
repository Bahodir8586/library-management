import React, { useEffect, useState, useMemo } from "react";

import withAuth from "../../HOCs/withAuth";
import axios from "../../utils/axios";
import Layout from "../../components/layout";
import AdminProfile from "../../components/admin/adminProfile";
import SuccessModal from "../../components/modals/successModal";
import FailModal from "../../components/modals/failModal";

const Profile = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [showFailModal, setShowFailModal] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleSubmit = (
    e,
    username,
    oldPassword,
    newPassword,
    confirmPassword
  ) => {
    e.preventDefault();
    let data = {};
    if (oldPassword || newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        setShowFailModal(true);
        setErrorText("Two passwords are not equal");
        return;
      }
      if (newPassword.length < 6) {
        setShowFailModal(true);
        setErrorText("Password should contain at least 6characters");
        return;
      }
      data = { oldPassword, newPassword, confirmPassword };
    }
    if (username) {
      data = { ...data, username };
    }
    axios
      .patch(`/admin`, data)
      .then((response) => {
        console.log(response);
        setShowSuccessModal(true);
        setSuccessText("Successfully updated");
      })
      .catch((error) => {
        console.log(error);
        setShowFailModal(true);
        setErrorText("Something went wrong. Please try again later");
        //    TODO: show different error messages
      });
  };

  useEffect(() => {
    // getting the name of admin
    axios
      .get(`admin`)
      .then((response) => {
        console.log(response.data);
        setName(response.data.username);
      })
      .catch((error) => {
        console.log(error);
      });
    // loading categories initially
    getCategories();
  }, []);

  const getCategories = () => {
    axios
      .get("/categories/")
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addCategory = (e, newCategory) => {
    e.preventDefault();
    console.log({ name: newCategory });
    axios
      .post(`/admin/categories`, { name: newCategory })
      .then((response) => {
        console.log(response.data);
        setSuccessText("New category successfully added");
        setShowSuccessModal(true);
        getCategories();
      })
      .catch((error) => {
        console.log(error);
        setShowFailModal(true);
        setErrorText("Something went wrong. Please try again later");
      });
  };

  const editCategory = (id, name) => {
    axios
      .patch(`admin/categories/${id}`, { name: name })
      .then((response) => {
        console.log(response);
        setSuccessText("Category successfully edited");
        setShowSuccessModal(true);
        getCategories();
      })
      .catch((error) => {
        console.log(error);
        setShowFailModal(true);
        setErrorText("Something went wrong. Please try again later");
      });
  };

  const deleteCategory = (id) => {
    axios
      .delete(`/admin/categories/${id}`)
      .then((response) => {
        console.log(response.data);
        setSuccessText("Category successfully deleted");
        setShowSuccessModal(true);
        getCategories();
      })
      .catch((error) => {
        console.log(error);
        setShowFailModal(true);
        setErrorText("Something went wrong. Please try again later");
      });
  };
  const successModal = useMemo(
    () => (
      <SuccessModal
        show={showSuccessModal}
        title={"Congratulations"}
        onConfirm={() => setShowSuccessModal(false)}
        text={successText}
      />
    ),
    [showSuccessModal, successText]
  );
  const failModal = useMemo(
    () => (
      <FailModal
        show={showFailModal}
        title={"Error"}
        onConfirm={() => setShowFailModal(false)}
        text={errorText}
      />
    ),
    [errorText, showFailModal]
  );

  return (
    <Layout>
      {successModal}
      {failModal}
      <AdminProfile
        name={name}
        categories={categories}
        handleSubmit={(
          e,
          username,
          oldPassword,
          newPassword,
          confirmNewPassword
        ) =>
          handleSubmit(
            e,
            username,
            oldPassword,
            newPassword,
            confirmNewPassword
          )
        }
        addCategory={(e, newCategory) => addCategory(e, newCategory)}
        editCategory={(id, name) => editCategory(id, name)}
        deleteCategory={(id) => deleteCategory(id)}
      />
    </Layout>
  );
};

export default withAuth(Profile);
