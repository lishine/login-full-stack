import ReactDOM from 'react-dom'
import { Provider } from 'beautiful-react-redux'
import store from './store/configureStore'
import App from './app/App'
import './styled/styledGlobal'

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)

module.hot.accept()
