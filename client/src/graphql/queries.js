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

export const GetUsersQuery = gql`
  {
    getUsers {
      _id
      username
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
      answerDate
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

export const GetMyNotAnsweredQuestionQuery = gql`
  query($questionID: ID!) {
    getMyNotAnsweredQuestion(questionID: $questionID) {
      isOk
      question {
        _id
        text
        theAsker {
          _id
          username
        }
      }
    }
  }
`;

export const GetUserByUsernameQuery = gql`
  query($username: String!) {
    getUserByUsername(username: $username) {
      _id
      username
      bio
      avatar
    }
  }
`;

export const GetUserQuery = '';
