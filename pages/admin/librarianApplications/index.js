import React from 'react';
import Layout from "../../../components/layout";
import withAuth from "../../../HOCs/withAuth";
import ApplicationsTable from "../../../components/librarian/applicationsTable";

const Applications = () => {
    return (
        <Layout>
            <ApplicationsTable/>
        </Layout>
    );
};

export default withAuth(Applications);
