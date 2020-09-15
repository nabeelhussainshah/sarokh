import Joi from 'joi';

export const basicInformation = Joi.object({
	firstName: Joi.string().required().label('First Name'),
	lastName: Joi.string().required().label('Last Name'),
	contact: Joi.string().min(13).max(13).required().label('Contact'),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
		.required(),
	dateOfBirth: Joi.date().required().label('Date Of Birth'),
});

export const driverDetails = Joi.object({
	driverType: Joi.string().required(),
	address: Joi.string().min(5).max(200).required(),
	country: Joi.string().required(),
	city: Joi.string().required(),
	postCode: Joi.string().min(3).max(10).required(),
	nicNumber: Joi.string()
		.min(10)
		.max(10)
		.required()
		.label('Iqama/NIC/Passport No'),
	licenseNumber: Joi.string()
		.min(10)
		.max(10)
		.required()
		.label('Driver License No'),
});

export const vehicleDetails = Joi.object({
	vehicleName: Joi.string().required().label('Vehicle Name'),
	vehicleModel: Joi.number()
		.min(1950)
		.max(new Date().getFullYear())
		.required()
		.label('Vehicle Model'),
	make: Joi.string().required().label('Vehicle Make'),
	type: Joi.string().required().label('Vehicle Type'),
	cargoCapacity: Joi.number().required().max(1000000).label('Cargo Capacity'),
	registrationNumber: Joi.string().required().label('Vehicle Registration No'),
	productionYear: Joi.number()
		.min(1950)
		.max(new Date().getFullYear())
		.required()
		.label('Vehicle Production Year'),
	registrationYear: Joi.number()
		.min(1950)
		.max(new Date().getFullYear())
		.required()
		.label('Registration Year'),
});

export const driverAccount = Joi.object({
	compensationCycle: Joi.number().min(1).max(1000).positive().required(),
	compensation: Joi.number().min(1).max(100000).positive().required(),
	contractStartDate: Joi.date().min('1-1-1950').required(),
	contractValidTill: Joi.date().required(),
	bank: Joi.string().required(),
	iban: Joi.string()
		.pattern(
			new RegExp(
				'SA[a-zA-Z0-9]{2}s?([0-9]{2})([a-zA-Z0-9]{2}s?)([a-zA-Z0-9]{4}s?){4}s?'
			)
		)
		.required()
		.messages({
			'string.pattern.base': 'IBAN Is Not Valid',
		}), // follow this link for further explaination https://stackoverflow.com/questions/58408362/how-to-set-custom-error-messages-in-hapi-joi
	// string.pattern.base sepecifies the error message name which can be replaced with a custom message, there are further more types of errors like string.base, string.empty, string.max which can be customized with custom messages
});
