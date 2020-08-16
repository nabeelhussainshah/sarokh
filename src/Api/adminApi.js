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

export async function allShippersApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/shipper/get-list`)
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				return res.data;
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

export async function shipperBillingApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/admin/get-shipper-billing`)
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

export async function addUserApi(data) {
	return await axios
		.post(`${process.env.REACT_APP_API}/user/add`, {
			...data,
			dob: new Date(data.dob).toISOString(),
		})
		.then((response) => {
			if (response.data.status === 200) {
				return true;
			} else {
				throw new Error('username already taken');
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function allUsersApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/user/get-list`)
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				return res.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function deleteUserApi(id) {
	return await axios
		.delete(`${process.env.REACT_APP_API}/user/delete/${id}`)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return true;
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

export async function updateUserApi(data, id) {
	return await axios
		.patch(`${process.env.REACT_APP_API}/user/update`, {
			...data,
			roleId: parseInt(data.roleId),
			dob: new Date(data.dob).toISOString(),
			userId: id,
		})
		.then((res) => {
			if (res.status === 200) {
				return true;
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

export async function addShipperWarehouseApi(data) {
	return await axios
		.post(`${process.env.REACT_APP_API}/sarokh-warehouse/add`, {
			...data,
			locationLatitude: data.location[0].latitude,
			locationLongitude: data.location[0].longitude,
		})
		.then((res) => {
			if (res.status === 200) {
				return true;
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

export async function updateShipperWarehouseApi(data) {
	return await axios
		.put(`${process.env.REACT_APP_API}/sarokh-warehouse/update`, {
			...data,
			locationLatitude: data.location[0].latitude,
			locationLongitude: data.location[0].longitude,
		})
		.then((res) => {
			if (res.status === 200) {
				return true;
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

export async function warehouseListApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/sarokh-warehouse/get-list`)
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

export async function deleteWarehouseApi(id) {
	return await axios
		.delete(`${process.env.REACT_APP_API}/sarokh-warehouse/delete/${id}`)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
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

export async function addDriverApi(data) {
	const payload = {
		...data,
		contactValidTill: new Date(data.contactValidTill).toISOString(),
		contractStartDate: new Date(data.contractStartDate).toISOString(),
		dateOfBirth: new Date(data.dateOfBirth).toISOString(),
	};

	return await axios
		.post(`${process.env.REACT_APP_API}/driver/add`, payload)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
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

export async function allDriversApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/driver/get-list`)
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				return res.data;
			} else {
				throw new Error(`something went wrong with status code: ${res.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function addVehicleApi(data) {
	return await axios
		.post(`${process.env.REACT_APP_API}/vehicle/add`, data)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
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

export async function allVehiclesApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/vehicle/get-list`)
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

export async function updateVehicleApi(data) {
	return await axios
		.put(`${process.env.REACT_APP_API}/vehicle/update`, data)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
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

export async function maintenanceRecordsApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/vehicle/get-list`)
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

export async function addDealerApi(data) {
	const payload = {
		...data,
		contractStartDate: new Date(data.contractStartDate).toISOString(),
		contractEndDate: new Date(data.contractEndDate).toISOString(),
		dateOfBirth: new Date(data.dateOfBirth).toISOString(),
	};

	return await axios
		.post(`${process.env.REACT_APP_API}/dealer/add`, payload)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
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

export async function allDealersApi() {
	return await axios
		.get(`${process.env.REACT_APP_API}/dealer/get-list`)
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

export async function updateDealerApi(data) {
	const payload = {
		...data,
		contractStartDate: new Date(data.contractStartDate).toISOString(),
		contractEndDate: new Date(data.contractEndDate).toISOString(),
		dateOfBirth: new Date(data.dateOfBirth).toISOString(),
	};

	return await axios
		.put(`${process.env.REACT_APP_API}/dealer/update`, payload)
		.then((res) => {
			if (res.data.status === 200) {
				return true;
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
