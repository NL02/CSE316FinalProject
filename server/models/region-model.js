const { model, Schema, ObjectId } = require('mongoose');

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
        }], 
        sub_region:[this]
	}
);

const Region = model('Region', regionSchema);
module.exports = Region;