import Joi from 'joi';

export const basicInformation = Joi.object({
	firstName: Joi.string().required().label('First Name'),
	lastName: Joi.string().required().label('Last Name'),
	contact: Joi.string().min(13).max(13).required().label('Contact'),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
		.required()
		.label('Email Address'),
	dateOfBirth: Joi.date().required().label('Date Of Birth'),
});

export const businessDetails = Joi.object({
	businessName: Joi.string().required(),
	iqamaNumber: Joi.string()
		.min(10)
		.max(10)
		.required()
		.label('Iqama/NIC/Passport No'),
	bankName: Joi.string().required(),
	iban: Joi.string()
		.pattern(
			new RegExp(
				'SA[a-zA-Z0-9]{2}s?([0-9]{2})([a-zA-Z0-9]{2}s?)([a-zA-Z0-9]{4}s?){4}s?'
			)
		)
		.required()
		.messages({
			'string.pattern.base':
				'IBAN Is Not Valid must be like "SA4420000001234567891234"',
		}),
});

export const billingDetail = Joi.object({
	address: Joi.string().min(5).max(200).required(),
	country: Joi.string().required(),
	city: Joi.string().required(),
	postCode: Joi.string().min(3).max(10).required().label('Post Code'),
	concernedPerson: Joi.string().min(3).required().label('Concerned Person'),
	concernedPersonDesignation: Joi.string()
		.min(3)
		.required()
		.label('Designation'),
});
