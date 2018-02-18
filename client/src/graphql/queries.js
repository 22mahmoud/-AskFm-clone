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

export const GetUserQuery = '';
