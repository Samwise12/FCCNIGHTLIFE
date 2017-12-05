import api from '../api';
import { VENUE_ADD, VENUE_REMOVE/*, VENUE_FETCHED*/  } from '../types';

const addVenue = venue => ({
	type: VENUE_ADD,
	venue
});

const removeVenue = venue => ({
	type: VENUE_REMOVE,
	venue
});

/*const venuesFetched = data => ({
	type: VENUE_FETCHED,
	data
})*/

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

export const userGoing = data => dispatch => {
	// console.log(data);
	return (
		 api.venues
		.fetchVenues(data)
/*		.then(venues => console.log(venues)
				// dispatch(venuesFetched(venues.data.venues))
			)*/
		)
}


