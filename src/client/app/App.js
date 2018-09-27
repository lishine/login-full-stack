import Login from '../login/Login'
import Link from 'redux-first-router-link'
import { When } from 'react-if'

import { routes } from 'router/routes'
import { getPage } from 'router.selectors'
import { getToken, getEmail } from 'auth.selectors'
import { logout } from 'auth.actions'

export default connect({ page: getPage, token: getToken, email: getEmail })(props => {
	const { page, token, email } = props
	return (
		<>
			<button onClick={() => dispatch(logout())}>logout</button>
			<div>page: {page}</div>
			<div>token: {token}</div>
			<div>email: {email}</div>
			{when(page)
				.is(routes.HOME, () => <div>I am home</div>)
				.is(routes.LOGIN, () => <Login />)
				.else(() => {})()}
		</>
	)
})

// {!userId ? (
//     <div>
//         <h1>HOME</h1>

//         <LinkButton to="/user/123">123</LinkButton>

//         <Link to={{ type: 'USER', payload: { id: 456 } }}>
//             <Button>456</Button>
//         </Link>
//         <span onClick={onClick}>User 5</span>
//     </div>
// ) : (
//     <h1>USER: {userId}</h1>
// )}

// fetch('/api/getUsername')
// .then((res) => res.json())
// .then((user) => this.setState({ username: user.username }))
