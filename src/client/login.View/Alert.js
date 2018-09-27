import { Flex, Box } from 'reflexbox'

import { alerts } from 'login/form/data'
import { getForm, getAlert } from 'login.selectors'
import * as routes from 'router/routes'
import { goToHome } from 'router/actions'

export default connect({
	form: getForm,
	alert: getAlert,
})(props => {
	const { form, alert } = props
	console.log('alert', alert)
	console.log('form', form)
	const { btnContinueToSite, message } = alerts[form][alert]
	return (
		<Flex column>
			<Box>
				message: {message}
				{when(!!alert).is(true, () => (
					<button onClick={() => dispatch(goToHome())}>HOME</button>
				))}
			</Box>
		</Flex>
	)
})
