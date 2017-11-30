import { combineReducers } from 'redux';

import user from "./reducers/user";
import venues from "./reducers/venues";

export default combineReducers({
	user,
	venues
})



