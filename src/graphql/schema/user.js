export default `
    type Location {
        type: String
        coordinates: [Float]
    }
    
    input LocationInput {
        type: String
        coordinates: [Float]
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
        username: String!
        password: String!
        bio: String
        avatar: String
        loc: Location
        followers: [User]
        following: [User]
    }
    
    type Me {
        id: ID!
        name: String!
        email: String!
        username: String!
        password: String!
        bio: String
        avatar: String
        loc: Location
        followers: [User]
        following: [User]
    }

    type RegisterResponse {
        isOk: Boolean!
        user: User
        errors: [Error]
    }

    type LoginResponse {
        isOk: Boolean!
        token: String
        errors: [Error]
    }

    type Query {
        getUser(email: String!): User
        getNearby: [User]
        me: Me
    } 

    type Mutation {
        register(username: String!, name: String!, email: String!, password: String!): RegisterResponse!
        addLocation(loc: LocationInput): Me!
        login(email: String!, password: String!): LoginResponse
        Togglefollow(userID: ID!): User
    }
`;
