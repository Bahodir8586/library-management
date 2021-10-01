import React from 'react';

import withAuth from "../../../HOCs/withAuth";
import Layout from "../../../components/layout";
import OrdersTable from "../../../components/shared/ordersTable";

const Orders = () => {
	return (
		<Layout>
			<OrdersTable/>
		</Layout>
	);
};

export default withAuth(Orders);
