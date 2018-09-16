import React, { Fragment } from 'react'
import { Formik, Field } from 'formik'

import { Button, Form, Title } from 'styled'

import EmailInput from '../inputs/EmailInput'
import PasswordInput from '../inputs/PasswordInput'
import PasswordConfirmationInput from '../inputs/PasswordConfirmationInput'

import { validate } from 'login/form/validate'
import { schema } from './schema'

export default () => (
	<Fragment>
		<Title>Sign Up</Title>
		<Formik
			initialValues={{
				email: '',
				password: '',
				passwordConfirmation: '',
			}}
			validate={validate(schema)}
			onSubmit={(values, { setSubmitting, setErrors }) =>
				setTimeout(() => {
					console.log('User has been sucessfully saved!', values)
					setSubmitting(false)
				}, 2000)
			}
			render={({
				touched,
				errors,
				values,
				handleChange,
				handleBlur,
				handleSubmit,
			}) => (
				<Form onSubmit={handleSubmit}>
					<Field name="email" component={EmailInput} />
					<Field name="password" component={PasswordInput} />
					<Field
						name="passwordConfirmation"
						component={PasswordConfirmationInput}
					/>
					<Button type="submit">Submit</Button>
				</Form>
			)}
		/>
	</Fragment>
)