/* this method transforms the data which is then send to shipment form for edit */

export const shipmentEditHelper = (data, id) => {
	return {
		id: id,
		...data,
		deliveryLocation:
			data.deliveryLocation === 'Last Mile'
				? 'To Sarokh Point'
				: data.deliveryLocation,
		location: [
			{
				label: data.address,
				latitude: data.locationLatitude,
				longitude: data.locationLongitude,
			},
		],
		total: data.total - Math.round((data.total / 100) * 15) + 1,
		update: true,
	};
};
