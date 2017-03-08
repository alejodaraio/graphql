const graphql = require('graphql');
const rest = require('restler');
const util = require('util');


const ContentType = new graphql.GraphQLObjectType({
    name: 'Content',
    fields: () => ({
        id: {
            type: graphql.GraphQLID,
        },
        title: {
            type: graphql.GraphQLString,
        },
        dropline: {
            type: graphql.GraphQLString
        }
    })
});

const BlockType = new graphql.GraphQLObjectType({
    name: 'Block',
    description: 'A block',
    fields: () => ({
        type: {
            type: graphql.GraphQLString
        },
        data: {
            type: ContentType
        }
    })
});

const BlockListType = new graphql.GraphQLObjectType({
    name: 'blocks',
    fields: () => ({
        block_list: {
            type: new graphql.GraphQLList(BlockType),
            args: {
                type: {
                    type: graphql.GraphQLString
                }
            }
        }
    })
});

const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        cover: {
            type: BlockListType,
            resolve: () => {
                return new Promise((resolve, reject) =>{
                    rest.get('http://tn.com.ar/3.0/cover/tn.json')
                        .on('success', function (result) {
                            resolve(result)
                        });
                });
            }
        }
    }
});

const schema = new graphql.GraphQLSchema({
    query: RootQuery
});

module.exports = schema;