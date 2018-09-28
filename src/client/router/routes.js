import createHistory from 'history/createBrowserHistory'
import { fork, select, take, call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { buildRoutesMap, route } from 'redux-saga-first-router'
import { loginNavigate } from 'login/login.logic/loginNavigate'

export const routes = {
	HOME: 'Home',
	LOGIN: 'Login',
}

function protectedRoute(navigateSaga) {
	return function*(...args) {
		const isAuthenticated = yield call(validateTokenFromLocalStorage)
		if (isAuthenticated) {
			yield fork(navigateSaga, ...args)
		} else {
			yield put(navigate('LOGIN'))
		}
	}
}

export const routesMap = buildRoutesMap(
	route(routes.HOME, '/'),
	route(routes.LOGIN, '/login', loginNavigate)
)

export const history = createHistory()

// export default {
// 	[r.HOME]: { path: '/', role: '' },
// 	[r.SIGN_UP]: {
// 		path: '/sign-up/:alert',
// 		domain: d.LOGIN,
// 		role: roles.ONLY_OPEN,
// 	},
// 	[r.SIGN_IN]: {
// 		path: '/sign-in/:alert',
// 		domain: d.LOGIN,
// 		role: roles.ONLY_OPEN,
// 	},
// 	[r.FORGOT_PASSWORD]: {
// 		path: '/forgot-password/:alert',
// 		domain: d.LOGIN,
// 		role: roles.ONLY_OPEN,
// 	},
// 	[r.NEW_PASSWORD]: {
// 		path: '/new-password/:alert',
// 		domain: d.LOGIN,
// 		role: roles.ONLY_OPEN,
// 	},
// 	[r.NEW_PASSWORD_LINK]: {
// 		path: '/new-password',
// 		role: roles.ONLY_OPEN,
// 		thunk: (dispatch, getState) => {
// 			console.log('getState().location', getState().location)
// 			const { token } = getState().location.query
// 			console.log('token', token)
// 			dispatch(a.redirect(r.NEW_PASSWORD, { token, alert: 'form' }))
// 		},
// 	},
// 	[r.REGISTER_CONFIRM]: {
// 		path: '/register-confirm',
// 		role: roles.ONLY_OPEN,
// 		thunk: (dispatch, getState) => {
// 			console.log('getState().location', getState().location)
// 			const { token: confirmToken } = getState().location.query
// 			console.log('confirmToken', confirmToken)
// 			axios
// 				.post(`/auth/registerconfirm`, { token: confirmToken })
// 				.then(function(response) {
// 					console.log('response', response)
// 					const { token: newToken } = response.data
// 					console.log('newToken', newToken)
// 					if (newToken) {
// 						dispatch(login(newToken))
// 						dispatch(a.redirect(r.SIGN_IN, { alert: 'emailConfirmed' }))
// 					} else {
// 						dispatch(a.redirect(r.SIGN_IN, { alert: 'form' }))
// 					}
// 				})
// 				.catch(function(err) {
// 					console.log('err', JSON.stringify(err))
// 				})
// 		},
// 	},
// }