import React, {useCallback} from 'react';
import Layout from "../../../components/layout";
import LibrariansTable from "../../../components/admin/librariansTable";
import withAuth from "../../../HOCs/withAuth";
import axios from "../../../utils/axios";
import useSWR from "swr";

// const fetcher = url => axios.get(url).then(res => res.data)
const Librarians = () => {
	// const {data, error} = useSWR('/admin/librarians?', fetcher)
	return (
		<Layout>
			<LibrariansTable/>
		</Layout>
	);
};

export default withAuth(Librarians);