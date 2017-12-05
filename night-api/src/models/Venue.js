import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	id: {type: String, required: true},//yelp id
	userId: {type: mongoose.Schema.Types.ObjectId, required: true},
	createdAt: {type: Date, default: Date.now(), index: {expires: 5}}
});

// schema.index({"expires": 1}, {expireAfterSeconds: 5});
// schema.index({ first: 1, last: -1});
 // schema.index({ createdAt: { type: Date, expires: 1 }});

export default mongoose.model("Venue", schema);
