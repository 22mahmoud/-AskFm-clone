export default `
    type Question {
        id: ID!
        text: String!
        theAsker: User!
        theResponder: User!
        answer: String
        likes: [User]
    }

    type QuestionResponse {
        question: Question
        errors: [Error]
    }
    type Query {
        getQuestions: [Question]
    }


    type Mutation {
        sendQuestion(text: String!,  theResponder: ID!): QuestionResponse
        AnswerQuestion(answer: String!, questionID: ID!): QuestionResponse
        likeQuestionToggle(questionID: ID!): QuestionResponse
        sendQuestionForNearby(text: String!): [Question]
    }
`;
