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
        _id: ID!
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
        _id: ID!
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
        user: User
    }
  
    type ChangeInfoRespone {
        isOk: Boolean!
        user: User
        token: String
        errors: [Error]
    }
    type MeResponse {
        user: User
        isOk: Boolean!
    }

    type TotalResponse {
        total: Int
    }

    type Query {
        getUser(email: String!): User
        getUserByUsername(username: String!): User
        getUsers: [User]
        getNearby: [User]
        me: MeResponse
        getTotalPosts(username: String): TotalResponse
        getTotalLikes(username: String): TotalResponse
    } 

    type Mutation {
        register(username: String!, email: String!, password: String!): RegisterResponse!
        addLocation(loc: LocationInput): Me!
        login(email: String!, password: String!): LoginResponse
        Togglefollow(userID: ID!): User
        changeInfo(username: String!, email: String!, bio: String!): ChangeInfoRespone
        changePassword(currentPassword: String!, newPassword: String!): ChangeInfoRespone
    }
`;
