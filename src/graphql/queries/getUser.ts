import gql from 'graphql-tag';

export default gql`
  query GetUser($email: AWSEmail!) {
    getUser(email: $email) {
      email
      name
      createdAt
      notifications
      createdBy
      phoneNumber
      theme
      palette {
        primary {
          main
        }
        secondary {
          main
        }
      }
    }
  }
`;
