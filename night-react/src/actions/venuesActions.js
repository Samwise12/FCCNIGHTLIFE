import api from '../api';
import { VENUE_ADD, VENUE_REMOVE } from '../types';

export const addVenue = venue => ({
	type: VENUE_ADD,
	venue
});

export const removeVenue = venue => ({
	type: VENUE_REMOVE,
	venue
});

export const addDestination = data => dispatch =>
	api.venues
		.addDestination(data)
		.then(venue => { // Redux part 
			if(typeof venue !== 'undefined') { 
		dispatch(addVenue(venue))
			} else {
				let o = data.id;
		dispatch(removeVenue(o)) //I dont think I need redux here
			};
	});




