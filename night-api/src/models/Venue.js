import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	id: {type: String, required: true},//yelp id
	userId: {type: mongoose.Schema.Types.ObjectId, required: true}
})

export default mongoose.model("Venue", schema);
