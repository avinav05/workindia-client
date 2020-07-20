import gql from "graphql-tag";

export const LINK_GENERATE_MUTATION = gql`
  mutation {
    linkGenerate
  }
`;
export const SEND_MESSAGE_MUTATION = gql`
  mutation sendMesage($link: String, $email: String, $text: String) {
    sendMessage(link: $link, email: $email, text: $text)
  }
`;
