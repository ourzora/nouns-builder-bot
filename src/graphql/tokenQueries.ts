import { gql } from "graphql-request";

export const GET_TOKEN_IMAGE = gql`
  query tokenImage($collectionAddress: String!, $tokenId: String!) {
    token(token: { address: $collectionAddress, tokenId: $tokenId }) {
      token {
        image {
          mediaEncoding {
            ... on ImageEncodingTypes {
              poster
            }
          }
        }
      }
    }
  }
`;
