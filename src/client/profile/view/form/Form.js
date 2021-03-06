import reject from 'lodash/fp/reject'
import { Formik, Field } from 'formik'

import {
	ErrorRow,
	SubmitButton,
	Button,
	Container,
	GroupHeaderRow,
	FieldRow,
	SubmitRow,
	Col,
	Form,
	Title,
	Link,
} from './styled'
import { Map } from 'utils/utils'
import { profileStore } from 'profile/profileStore'
import { validate } from 'common/form/validate'
import { groups } from './groups'
import { submit } from 'profile/logic/actions'

export default view(props => {
	const { editGroup, values, error, cancel, edit, setFormikProps, loading } = profileStore

	return (
		<Container>
			<Title>Profile</Title>
			{!loading ? (
				<Formik
					initialValues={values}
					validate={editGroup && validate(groups[editGroup].schema)}
					onSubmit={() => dispatch(submit())}
					render={formikProps => {
						setFormikProps(formikProps)
						const { handleSubmit, isSubmitting } = formikProps

						return (
							<Form onSubmit={handleSubmit}>
								<Map collection={groups}>
									{({ label, link, fields, showWhenReadOnly }, group) => {
										const editingThisGroup = editGroup === group
										const editing = editGroup

										return (
											<div key={group}>
												<GroupHeaderRow>
													<Col>
														<div>{label}</div>
													</Col>
													<Col>
														{!editing && (
															<Link onClick={() => edit(group)}>
																{link}
															</Link>
														)}
														{editingThisGroup && (
															<SubmitRow>
																<Col>
																	<Button
																		type="button"
																		onClick={cancel}>
																		Cancel
																	</Button>
																</Col>
																<Col>
																	<SubmitButton
																		state={
																			isSubmitting ? 'loading' : ''
																		}
																	/>
																</Col>
															</SubmitRow>
														)}
													</Col>
												</GroupHeaderRow>
												{editingThisGroup &&
													error && <ErrorRow>{error}</ErrorRow>}
												<Map
													collection={reject(
														field =>
															!editingThisGroup && field.hiddenInViewMode
													)(fields)}>
													{({ name, label, component, viewOnly }, field) => (
														<div key={field}>
															<FieldRow>
																<Col>
																	<div htmlFor={name}>{label}</div>
																</Col>
																<Col>
																	<Field
																		{...{
																			width: '200',
																			readOnly:
																				viewOnly ||
																				!editingThisGroup,
																			name,
																			component,
																			label,
																			labelPosition: 'side',
																		}}
																	/>
																</Col>
															</FieldRow>
														</div>
													)}
												</Map>
											</div>
										)
									}}
								</Map>
							</Form>
						)
					}}
				/>
			) : (
				'Loading'
			)}
		</Container>
	)
})
