const { model, Schema, ObjectId } = require('mongoose');
const MapItem = require('./map-model').schema;

const todolistSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},

		name: {
			type: String,
			required: true
		},
		owner: {
			type: String,
			required: true
		},
		maps: [MapItem],
		sortRule: {
			type: String, 
			required: true
		},
		sortDirection: {
			type: Number, 
			required: true
		}
	},
	{ timestamps: true }
);

const Todolist = model('Todolist', todolistSchema);
module.exports = Todolist;