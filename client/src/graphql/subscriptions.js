import gql from 'graphql-tag';

export const QuestionLikedSubscriptions = gql`
  subscription {
    questionLiked {
      _id
      likesCount
    }
  }
`;

export const QuestionAsnweredSubscriptions = gql`
  subscription {
    questionAsnwered {
      _id
      text
      isLiked
      likesCount
      theAsker {
        _id
        username
      }
      theResponder {
        _id
        username
      }
      answer
      createdAt
      answerDate
    }
  }
`;

export const NewQuestionSendedSubscriptions = gql`
  subscription {
    newQuestionSended {
      _id
      text
      isLiked
      likesCount
      theAsker {
        _id
        username
      }
      theResponder {
        _id
        username
      }
      answer
      createdAt
      answerDate
    }
  }
`;
