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
        sub_regions: [Region]
    }
    extend type Query {
        getAllMaps: [Map]
    }
    extend type Mutation {
        addMap( map: MapInput!): Map
        deleteMap(_id: String!): Boolean
    }

    input MapInput {
        _id: String
        name: String
        owner: String
        regions: [RegionInput]
    }

    input RegionInput {
        _id: String
        name: String
        capital: String
        leader: String
        landmark: [String]
        sub_regions:[RegionInput]
    }
`;

module.exports = {typeDefs: typeDefs}