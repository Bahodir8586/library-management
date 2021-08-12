import React from 'react';
import Layout from "../../../components/layout/layout";
import withAuth from "../../../HOCs/withAuth";
import OrdersTable from "../../../components/shared/ordersTable";

const Orders = () => {
	return (
		<Layout>
			<OrdersTable/>
		</Layout>
	);
};

export default withAuth(Orders);