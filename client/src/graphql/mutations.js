import gql from 'graphql-tag';

export const LoginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      isOk
      token
      errors {
        path
        message
      }
    }
  }
`;

export const RegisterMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      isOk
      errors {
        path
        message
      }
    }
  }
`;

export const SendQuestiondMutation = gql`
  mutation($text: String!, $theResponder: ID!) {
    sendQuestion(text: $text, theResponder: $theResponder) {
      question {
        _id
        text
      }
      errors {
        path
        message
      }
    }
  }
`;

export const AnswerQuestionMutation = gql`
  mutation($answer: String!, $id: ID!) {
    AnswerQuestion(answer: $answer, questionID: $id) {
      isOk
      question {
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
      errors {
        path
        message
      }
    }
  }
`;

export const LikeQuestionToggleMutation = gql`
  mutation($questionID: ID!) {
    likeQuestionToggle(questionID: $questionID) {
      question {
        __typename
        _id
        isLiked
        likesCount
      }
    }
  }
`;
