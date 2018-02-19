import gql from 'graphql-tag';

export const QuestionLikedSubscriptions = gql`
  subscription {
    questionLiked {
      _id
      likesCount
    }
  }
`;

export const wowaa = '';
