import isLogged from '../services/auth';

export default {
  Mutation: {
    sendQuestion: isLogged,
    AnswerQuestion: isLogged,
    likeQuestionToggle: isLogged,
    // sendQuestionForNearby(text: String!): [Question]
  },
  Query: {
    me: isLogged,
    getQuestions: isLogged,
    getMyNotAnswerdQuestions: isLogged,
    getUserAnsweredQuestions: isLogged,
    getMyNotAnsweredQuestion: isLogged,
  },
};
