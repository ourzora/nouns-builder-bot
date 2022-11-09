
import { gql } from "graphql-request";

export const GET_ALL_NEW_DAOS = gql`
  query GetAllNewDaosDeployed(
    $endBlock: Int
    $startBlock: Int
    $collectionAddresses: [String!]
  ) {
    nouns {
      nounsEvents(
        filter: {
          nounsEventTypes: NOUNS_BUILDER_MANAGER_EVENT
          timeFilter: { endBlock: $endBlock, startBlock: $startBlock }
        }
        networks: { network: ETHEREUM, chain: MAINNET }
        sort: { sortKey: CREATED, sortDirection: ASC }
        where: { collectionAddresses: $collectionAddresses }
      ) {
        nodes {
          collectionAddress
          transactionInfo {
            blockNumber
          }
        }
      }
    }
  }
`;


