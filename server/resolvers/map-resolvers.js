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
        },
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
        deleteRegion: async (_, args) => {
            const { mapId, regionId} = args 
            const mapID = new ObjectId(mapId);
            const found = await Map.findOne({_id: mapID});
            let regionItems = found.regions;
            otherRegions = regionItems.filter(item => item._id.toString() !== regionId);
            ItemDeleted = regionItems.filter(item => item._id.toString() === regionId);
            const updated = await Map.updateOne({_id: mapID}, {regions: otherRegions})
            if(updated) return(ItemDeleted)
            else return(otherRegions)
        },
        updateItemField: async (_,args) => {
            const { _id, itemId, field } = args;
            let { value } = args
            const mapId = new ObjectId(_id);
            const found = await Map.findOne({_id: mapId});
            let regionItems = found.regions;
            regionItems.map(item => {
                if (item._id.toString() === itemId) {
                    item[field] = value;
                }
            })
            // console.log("Update???")
            // console.log(mapId)
            // console.log(itemId)
            // console.log(field)
            // console.log(value)
            // console.log(regionItems)
            const updated = await Map.updateOne({_id: mapId}, {regions: regionItems})
            if(updated) return(regionItems);
            else return(found.regions)
        },
        addRegion: async(_, args) => {
            const { region } = args;
            const objectId = new ObjectId();
            const { id, name, capital, leader, landmark, parentId, subregion} = region;
            const parent = await Map.findOne({_id: parentId})
            const newRegion = new Region({
                _id: objectId,
                name: name,
                capital: capital,
                leader: leader,
                landmark: landmark,
                subregion: subregion 
            });
            if(!parent) return ('Parent not found');
            let subregionList = parent.regions;
            subregionList.push(newRegion)
            const updated = await Map.updateOne({_id: parentId}, {regions: subregionList})
            if(updated) {
                console.log(newRegion)
                return newRegion
            } else return('Could not add subregion')
        },
    }

}