import React from 'react';

import withAuth from "../../../HOCs/withAuth"
import Layout from "../../../components/layout";
import EditBook from "../../../components/shared/editBook";

const Book = () => {
    return (
        <Layout>
            <EditBook/>
        </Layout>
    );
};

export default withAuth(Book);
