const  { projects, clients } = require('../sampleData');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require('graphql');


// Clinet  Type
const ClinetType =  new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id : { type: GraphQLID},
        name : { type: GraphQLString},
        email : { type: GraphQLString},
        phone : { type: GraphQLString},
    })
});

// Project Type
const ProjectType =  new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id : { type: GraphQLID},
        name : { type: GraphQLString},
        description : { type: GraphQLString},
        status : { type: GraphQLString},
        client: {
            type: ClinetType,
            resolve(parent, args){
                return clients.find(client => client.id === parent.id)
            }
        }
    })
});

const RootQuery =  new GraphQLObjectType({
    name: 'RootQueryType',
    fields :{
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return projects;
            }
        },
        prtoject: {
            type: ProjectType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                return projects.find(project => project.id === args.id );
            }
        },
        clients: {
            type: new GraphQLList(ClinetType),
            resolve(parent, args){
                return clients;
            }
        },
        client: {
            type: ClinetType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                return clients.find(client => client.id === args.id );
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})