const { gql } = require('apollo-server');

const typeDefs = gql `
    type Map {
        _id: String!
        name: String!
        owner: String!
        regions: [Region]
    }
    type Region {
        _id: String!
        name: String!
        capital: String!
        leader: String!
        landmark: [String]
        subregions:[String]
    }
    extend type Query {
        getAllMaps: [Map]
    }
    extend type Mutation {
        addMap( map: MapInput!): Map
        deleteMap(_id: String!): Boolean
        addRegion(region: RegionInput!): Region
    }

    input MapInput {
        _id: String
        name: String
        owner: String
        regions: [String]
    }

    input RegionInput {
        _id: String
        name: String
        capital: String
        leader: String
        landmark: [String]
        subregions:[String]
    }
`;

module.exports = {typeDefs: typeDefs}