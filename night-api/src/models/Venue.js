import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
// import moment from 'moment';

var Aschema = new mongoose.Schema({
	id: {type: String, required: true, unique: true},//yelp id
	userId: {type: mongoose.Schema.Types.ObjectId, required: true}
    ,expirationDate: { type: Date, expires: 0 }
    ,createdAt: { type: Date, default: Date.now } //removes independently
});

Aschema.statics.findOrCreate = function (params, done) {
	// console.log('params:',params);
	Venue.findOne({
	"id" : params.id,
	"userId": params.userId
		},
		function(err, venue) {
			// console.log('venue: ', venue) 
			if (err) {
				// console.log('ErrHere');
				return done(err);
			}
			
			if (!venue) {
				// console.log('here');
				//expires tomorrow at 5:00:00 a.m.
				var d = new Date();         //current Date
				d.setDate(d.getDate()+1)  //same time tomorrow
				d.setHours(0)               //10zulu, 5:XX:XX a.m. central standard time
				d.setMinutes(40)             //5:00:XX a.m.
				d.setSeconds(0)             //5:00:00 a.m.

				var expDate = d;

				venue = new Venue ({
					id: params.id,
					userId: params.userId,
        			expirationDate: expDate
				});
				venue.save(function(err) {
						if (err) console.log(err);
						// console.log('here1');
						return done(err, venue);
				});
			} else {
				//found venue. Return
				console.log('here2');
				return done(err, venue);
			}
		});
};

Aschema.index({'expireAt':1,}, {'expireAfterSeconds': 0});

var Venue = mongoose.model("Venue", Aschema, 'venues');

module.exports = Venue;

// export default Venue;

// y.createIndex( { "lastModifiedDate": 1 }, { expireAfterSeconds: 5 } )

// db.collection('venues').createIndex({"expireAt": 1}, { expireAfterSeconds: 0 })