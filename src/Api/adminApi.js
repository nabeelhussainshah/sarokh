import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

export async function allShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-all-shipments/`)
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

export async function deliveredShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-delivered-shipments/`)
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

export async function pendingShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-pending-shipments/`)
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

export async function noResponseShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-noresponse-shipments/`)
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

export async function CODShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-cod-shipments/`)
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

export async function prepaidShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-prepaid-shipments/`)
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

export async function returnShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-returned-shipments/`)
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

export async function pickupShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-pickup-shipments/`)
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

export async function deliveryShipmentsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-delivery-shipments/`)
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

export async function shipmentIssuesApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-shipment-issues/`)
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