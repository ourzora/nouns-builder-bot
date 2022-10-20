
import { gql } from "graphql-request";

export const GET_ALL_NEW_DAOS = gql`
  query GetAllNewDaosDeployed($endBlock: Int, $startBlock: Int) {
    nouns {
      nounsEvents(
        filter: {
          nounsEventTypes: NOUNS_BUILDER_MANAGER_EVENT
          timeFilter: { endBlock: $endBlock, startBlock: $startBlock }
        }
        networks: { network: ETHEREUM, chain: GOERLI }
        sort: { sortKey: CREATED, sortDirection: ASC }
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
