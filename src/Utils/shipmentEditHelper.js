/* this method transforms the data which is then send to shipment form for edit */

export const shipmentEditHelper = (data, id) => {
	console.log('this is the data and id', data, id);

	return {
		...data,
		id: id,
		deliveryLocation:
			data.deliveryLocation === 'Last Mile'
				? 'To Customer Address'
				: 'To Sarokh Point',
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
