import * as c from './login.constants'

export default (state = { formikProps: {} }, action) => {
	const { payload } = action

	switch (action.type) {
		case c.SET_FORMIK_PROPS:
			return { ...state, formikProps: payload.data }
		default:
			return state
	}
}
