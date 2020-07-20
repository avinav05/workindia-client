import { GraphQLClient } from 'graphql-request';

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://cabpoolserver.herokuapp.com/'
    : 'http://localhost:5000/';
export const WS_URL =
  process.env.NODE_ENV === 'production'
    ? 'ws://cabpoolserver.herokuapp.com/'
    : 'ws://localhost:5000/';

export const useClient = () => {
  return new GraphQLClient(BASE_URL);
};