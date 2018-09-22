import * as yup from 'yup'
import { MIN_PASSWORD_LENGTH } from 'fixed'
export default {
	name: yup.string().required('Name is required!'),
	email: yup
		.string()
		.email('E-mail is not valid!')
		.required('E-mail is required!'),
	password: yup
		.string()
		.min(
			MIN_PASSWORD_LENGTH,
			`Password has to be longer than ${MIN_PASSWORD_LENGTH} characters!`
		)
		.required('Password is required!'),
	passwordConfirmation: password =>
		yup
			.string()
			.oneOf([password], 'Passwords are not the same!')
			.required('Password confirmation is required!'),
}
