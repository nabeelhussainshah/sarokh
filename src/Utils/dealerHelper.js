import moment from 'moment';

export const dealerEditHelper = (data) => {
	return {
		...data,
		owner: data.ownerName,
		contactNo: data.contact,
		postCode: data.zipCode,
		compensationPerShipment: data.perShipmentsCompensation,
		compensationCycle: data.compensationClearanceDuration,
		contractStartDate: moment(data.contractStartDate).format('YYYY-MM-DD'),
		contractEndDate: moment(data.contractEndDate).format('YYYY-MM-DD'),
		email: data.user.email,
		dateOfBirth: moment(data.user.dob).format('YYYY-MM-DD'),
		profilePicture: data.user.profilePicture,
		iban: data.bankAccount.iban,
		businessGroupName: data.companyName,
		userName: data.user.userName,
		password: data.user.userPassword,
		bank: data.bankAccount.bank,
		iqamaFile: data.nicFile,
		update: true,
	};
};

export const pointEditHelper = (data) => {

	let saturdayTime = 'none';
	let fridayTime = 'none';

	if (data.timingFriday !== null) {
		fridayTime = data.timingFriday.split('/');
		fridayTime[0] = moment(fridayTime[0], "HH:mm:ss");
		fridayTime[1] = moment(fridayTime[1], "HH:mm:ss");
	}
	if (data.timingSaturdayToThursday !== null) {
		saturdayTime = data.timingSaturdayToThursday.split('/');
		saturdayTime[0] = moment(saturdayTime[0], "HH:mm:ss");
		saturdayTime[1] = moment(saturdayTime[1], "HH:mm:ss");
	}

	return {
		...data,
		userName: data.user.userName,
		password: data.user.userPassword,
		location: [
			{
				label: data.address,
				latitude: data.locationLatitude,
				longitude: data.locationLongitude,
			},
		],
		update: true,
		timingFridayStart: fridayTime === 'none' ? undefined : fridayTime[0]._d,
		timingFridayEnd: fridayTime === 'none' ? undefined : fridayTime[1]._d,
		timingSaturdayToFridayStart: saturdayTime === 'none' ? undefined : saturdayTime[0]._d,
		timingSaturdayToFridayEnd: saturdayTime === 'none' ? undefined : saturdayTime[1]._d
	};
};
