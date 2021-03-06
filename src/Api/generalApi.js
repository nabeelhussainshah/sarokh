import axios from 'axios';

export async function uploadFile(file) {
	const formdata = new FormData();
	formdata.append('file', file);
	formdata.append('filename', file.name);

	return await axios
		.post(`${process.env.REACT_APP_API}/upload-file`, formdata, {
			headers: {
				'Content-Type': 'multipart/form-data;',
			},
		})
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data;
			} else {
				throw new Error(`something went wrong with status: ${res.data.status}`);
			}
		})
		.catch((err) => {
			throw err;
		});
}

export async function sarokhWarehouseList() {
	return await axios
		.get(`${process.env.REACT_APP_API}/sarokh-warehouse/get-list`)
		.then((res) => {
			console.log(res);
			if (res.data.status === 200) {
				return res.data.data.warehouseList;
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
