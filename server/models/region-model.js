const { model, Schema, ObjectId } = require('mongoose');
const subregion = require('./subregion-model').schema;

const regionSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		capital: {
			type: String,
			required: true
		},
		leader: {
			type: String,
			required: true
		},
		landmark: [{
            type: String,
            required: false
        }]
	}
);
const Region = model('Region', regionSchema);
module.exports = Region;