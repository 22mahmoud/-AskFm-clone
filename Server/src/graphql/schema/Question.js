export default `
    
    scalar Date


    type Question {
        _id: ID!
        text: String!
        theAsker: User!
        theResponder: User!
        answer: String
        likesCount: Int!
        isLiked: Boolean! 
        createdAt: Date!
        updatedAt: Date!
    }

    type QuestionResponse {
        question: Question
        errors: [Error]
    }
    type Query {
        getQuestions: [Question]
    }


    type Mutation {
        sendQuestion(text: String!,  theResponder: ID!, isLiked: Boolean = false): QuestionResponse
        AnswerQuestion(answer: String!, questionID: ID!): QuestionResponse
        likeQuestionToggle(questionID: ID!): QuestionResponse
        sendQuestionForNearby(text: String!): [Question]
    }
`;
