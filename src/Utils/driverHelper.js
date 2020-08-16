import moment from 'moment';

export const driverEditHelper = (data) => {
	return {
		...data,
		...data.bankAccount,
		...data.user,
		...data.vehicle,
		contractStartDate: moment(data.contractStartDate).format('YYYY-MM-DD'),
		contractValidTill: moment(data.contractValidTill).format('YYYY-MM-DD'),
		dateOfBirth: moment(data.user.dob).format('YYYY-MM-DD'),
	};
};
