export default `
    
    scalar Date


    type Question {
        _id: ID!
        text: String!
        theAsker: User!
        theResponder: User!
        answer: String
        likesCount: Int!
        isLiked: Boolean
        answerDate: Date
        createdAt: Date!
    }

    type QuestionResponse {
        isOk: Boolean
        question: Question
        errors: [Error]
    }
    
    
    type Query {
        getQuestions: [Question]
        getMyNotAnswerdQuestions: [Question]
        getUserAnsweredQuestions(username: String!): [Question]
        getMyNotAnsweredQuestion(questionID: ID!): QuestionResponse
    }

    type Mutation {
        sendQuestion(text: String!,  theResponder: ID!, isLiked: Boolean = false): QuestionResponse
        AnswerQuestion(answer: String!, questionID: ID!): QuestionResponse
        likeQuestionToggle(questionID: ID!): QuestionResponse
        sendQuestionForNearby(text: String!): [Question]
    }
    type Subscription {
        questionLiked: Question
        questionAsnwered: Question
        newQuestionSended: Question
    }
    

      
`;
