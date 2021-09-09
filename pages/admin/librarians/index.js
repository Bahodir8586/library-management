import React from 'react';
import Layout from "../../../components/layout";
import LibrariansTable from "../../../components/admin/librariansTable";
import withAuth from "../../../HOCs/withAuth";

const Librarians = () => {
    return (
        <Layout>
            <LibrariansTable/>
        </Layout>
    );
};

export default withAuth(Librarians);
