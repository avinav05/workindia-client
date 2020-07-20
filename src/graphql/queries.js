import gql from "graphql-tag";
export const USER_EXISTS_QUERY = gql`
  query($email: String!) {
    userExists(email: $email)
  }
`;

export const GET_CHAT_DETAILS = gql`
  query getChat($link: String) {
    getChat(link: $link) {
      email
      text
    }
  }
`;
