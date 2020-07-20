import gql from "graphql-tag";
export const GET_CHAT_DETAIL = gql`
  subscription getChatDetails($link: String) {
    getChatDetails(link: $link) {
      email
      text
    }
  }
`;
