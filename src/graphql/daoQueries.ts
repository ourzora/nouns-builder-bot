import { gql } from "graphql-request";

export const GET_DAO_INFO = gql`
  query GetDaoInfo($collectionAddresses: String!) {
    nouns {
      nounsDaos(
        networks: { network: ETHEREUM, chain: MAINNET }
        where: { collectionAddresses: [$collectionAddresses]}
      ) {
        nodes {
          name
          collectionAddress
          symbol
        }
      }
    }
  }
`;
