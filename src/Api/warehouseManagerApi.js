import axios from 'axios';

export async function dashboardApi(id) {
	return await axios
		.get(
			`${process.env.REACT_APP_API}/sarokh-warehouse/get-warehouse-dashboard/${id}`
		)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}
