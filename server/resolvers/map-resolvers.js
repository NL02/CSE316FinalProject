const ObjectId = require('mongoose').Types.ObjectId;
const Map = require('../models/map-model');
const Region = require('../models/region-model')

module.exports = {
    Query: {
        getAllMaps: async(_, __, { req }) => {
            const _id = new ObjectId(req.userId);
            if(!_id) { return([])};
            const maplists = await Map.find({owner: _id}).sort({updatedAt: 'descending'});
            if (maplists) {
                return (maplists);
            }
        }
    },
    Mutation: {
        addMap: async(_, args) => {
            const { map } = args;
            const objectId = new ObjectId();
            const { id, name, owner, regions } = map;
            const newMap = new Map({
                _id: objectId,
                name: name,
                owner: owner,
                regions: regions,
            });
            const updated = await newMap.save();
            if (updated) {
                // console.log(newMap)
                return newMap;
            }
        },

        deleteMap: async(_, args) => {
            const { _id } = args;
            const objectId = new ObjectId(_id);
            const deleted = await Map.deleteOne({_id: objectId});
            if(deleted) return true;
            else return false
        },
        
        addRegion: async(_, args) => {
            const { subregion } = args;
            const objectId = new ObjectId();
            const { id, name, capital, leader, landmark, subregions} = subregion;
            const newRegion = new Region({
                _id: objectId,
                name: name,
                capital: capital,
                leader: leader,
                landmark: landmark,
                subregions: subregions, 
            });
            const updated = await newRegion.save();
            if(updated) {
                console.log(newRegion)
                return newRegion
            }
        },
    }

}