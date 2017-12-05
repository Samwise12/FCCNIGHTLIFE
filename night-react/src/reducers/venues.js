import { VENUE_ADD, VENUE_REMOVE, VENUE_FETCHED } from "../types";
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
		case VENUE_FETCHED:
			// console.log(...action.data)			
			return {...action.data}
    default:
      return state;
  }
}

// SELECTORS
