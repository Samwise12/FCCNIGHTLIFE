import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import decode from 'jwt-decode';

import rootReducer from './rootReducer';
import App from './App';
import { userLoggedIn } from './actions/auth';
import setAuthorizationHeader from './utils/setAuthorizationHeader';

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk)
		)
	);

if (localStorage.nightJWT) {
	const payload = decode(localStorage.nightJWT)
	const user = { 
		token: localStorage.nightJWT,
		email: payload.email,
		confirmed: payload.confirmed
	};
	setAuthorizationHeader(localStorage.nightJWT);
	store.dispatch(userLoggedIn(user));
	// store.dispatch(userLoggedOut(user));
}

ReactDOM.render(<BrowserRouter>
		<Provider store={store}>
			<Route component={App} />
		</Provider>
	</BrowserRouter>,
 document.getElementById('root'));
registerServiceWorker();

