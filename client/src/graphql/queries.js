import gql from 'graphql-tag';

export const MeQuery = gql`
  {
    me {
      isOk
      user {
        _id
        username
        email
        bio
        avatar
      }
    }
  }
`;

export const GetQestionsQuery = gql`
  {
    getQuestions {
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
      updatedAt
    }
  }
`;

export const GetMyNotAnswerdQuestionsQuery = gql`
  {
    getMyNotAnswerdQuestions {
      _id
      text
      theAsker {
        _id
        username
      }
      createdAt
    }
  }
`;

export const GetUserQuery = '';
