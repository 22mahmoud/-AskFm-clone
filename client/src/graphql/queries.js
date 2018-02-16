import gql from 'graphql-tag';

export const MeQuery = gql`
  {
    me {
      _id
      username
      email
      bio
      avatar
    }
  }
`;

export const GetUserQuery = '';
