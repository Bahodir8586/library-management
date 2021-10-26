import React from "react";

import withAuth from "../../../HOCs/withAuth";
import Layout from "../../../components/layout";
import EditBook from "../../../components/shared/editBook";

export async function getStaticPaths() {
  const res = await fetch("https://systemm-library.herokuapp.com/api/books", {
    headers: {
      "Content-type": "application/json",
    },
  });
  const json = await res.json();
  const books = json.data;
  const paths = books?.map((book) => ({
    params: { id: book.id.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(
      "https://systemm-library.herokuapp.com/api/categories",
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const categories = await res.json();
    const res2 = await fetch(
      `https://systemm-library.herokuapp.com/api/books/${params.id}`,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const book = await res2.json();
    return {
      props: {
        categories: [...categories],
        book: { ...book },
      },
    };
  } catch (e) {
    console.log(e);
    console.log(e.response);
    return {
      props: {
        categories: [],
        book: {},
      },
    };
  }
}

const Book = ({ categories, book }) => {
  return (
    <Layout>
      <EditBook categories={categories} book={book} submit={() => {}} />
    </Layout>
  );
};

export default withAuth(Book);
