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
