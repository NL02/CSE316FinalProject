const { model, Schema, ObjectId } = require('mongoose');

const subregionSchema = new Schema(
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
	}
);
const SubRegion = model('subRegion', subregionSchema);
module.exports = SubRegion;