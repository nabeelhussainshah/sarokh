import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

export async function dashboardApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/web-dashboard/shipper/${user.id}`)
		.then((res) => {
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function allShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/order/get-all-shipments/${user.id}`)
		.then((res) => {
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function deleteShipmentApi(id) {
	return await axios
		.delete(`${process.env.REACT_APP_API}/order/delete/${id}`)
		.then((res) => {
			if (res.data.status === 200) {
				return res;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function editShipmentApi(id) {
	return await axios
		.get(`${process.env.REACT_APP_API}/order/edit-order/${id}`)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(
					`something went wrong with status code: ${res.data.status}`
				);
			}
		})
		.catch((err) => {
			throw err;
		});
}
