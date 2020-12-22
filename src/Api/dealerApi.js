import axios from 'axios';

export async function dealerDashboardApi() {
    const user = await JSON.parse(localStorage.getItem('user'));
    return axios
        .post(`${process.env.REACT_APP_API}/dealer-mobile/dashboard/${user.id}`)
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

export async function getRecieveShipmentDetailsApi() {
    const user = await JSON.parse(localStorage.getItem('user'));
    return axios
        .get(`${process.env.REACT_APP_API}/dealer-mobile/get-give-shipments-detail/${user.id}`)
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

export async function getGiveShipmentDetailsApi() {
    const user = await JSON.parse(localStorage.getItem('user'));
    return axios
        .get(`${process.env.REACT_APP_API}/dealer-mobile/get-give-shipments-detail/${user.id}`)
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

export async function recieveShipmentApi(trackingNo) {
    const user = await JSON.parse(localStorage.getItem('user'));
    return axios
        .post(`${process.env.REACT_APP_API}/dealer-mobile/recieve-shipment/`, {
            dealerId: user.id,
            trackingNumber: trackingNo
          })
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

export async function requestTaskConfirmationApi() {
    const user = await JSON.parse(localStorage.getItem('user'));
    return axios
        .get(`${process.env.REACT_APP_API}/dealer-mobile/request-sarokh-task-confirmation/${user.id}`)
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

export async function getSarokhTaskApi() {
    const user = await JSON.parse(localStorage.getItem('user'));
    return axios
        .get(`${process.env.REACT_APP_API}/dealer-mobile/get-sarokh-task/${user.id}`)
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

export async function getCityListApi() {
    const user = await JSON.parse(localStorage.getItem('user'));
    return axios
        .get(`${process.env.REACT_APP_API}/city/get-list`)
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

export async function getShipperDeliveryChargesApi() {
    return axios
        .get(`${process.env.REACT_APP_API}/shipper/get-shipper-delivery-charges/${1}`)
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

export async function createMobileShipmentApi(values) {
    return axios
        .post(`${process.env.REACT_APP_API}/dealer-mobile/create-mobile-shipment/`, values)
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

export async function createBillApi(values) {
    return axios
        .post(`${process.env.REACT_APP_API}/bill/create-bill`, values)
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

export async function deleteBillApi(id) {
    return axios
        .delete(`${process.env.REACT_APP_API}/bill/delete/${id}`)
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
    return axios
        .delete(`${process.env.REACT_APP_API}/order/delete/${id}`)
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

export async function recordBillPaymentApi(values) {
    return axios
        .post(`${process.env.REACT_APP_API}/bill/record-bill-payment`, values)
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

export async function verifyShipmentTrackingNoApi(trackingNo) {
    return axios
        .get(`${process.env.REACT_APP_API}/dealer-mobile/verify-shipment-trackingNo/${trackingNo}`)
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

export async function getShipperRecieveApi(shipperId) {
    return axios
        .get(`${process.env.REACT_APP_API}/dealer-mobile/get-shipper-receive/${shipperId}`)
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

export async function onConfirmShipperRecieveShipmentApi(values) {
    return axios
        .post(`${process.env.REACT_APP_API}/dealer-mobile/confirm-shipper-receive-shipments`, values)
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

