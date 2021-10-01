import React from 'react';

import withAuth from "../../../HOCs/withAuth";
import Layout from "../../../components/layout";
import LibrariansTable from "../../../components/admin/librariansTable";

const Librarians = () => {
    return (
        <Layout>
            <LibrariansTable/>
        </Layout>
    );
};

export default withAuth(Librarians);
