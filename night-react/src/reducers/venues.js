import { VENUE_ADD, VENUE_REMOVE } from "../types";
// import omitBy from 'lodash/omit';

let id = []; 
export default function books(state = {}, action = {}) {
  switch (action.type) {
		case VENUE_ADD: 
			id.push(action.venue);
			// console.log(action.venue)
			return {
				...state,
				id
			}
		case VENUE_REMOVE: 		
			// console.log(state);
			return state;
    default:
      return state;
  }
}

// SELECTORS
