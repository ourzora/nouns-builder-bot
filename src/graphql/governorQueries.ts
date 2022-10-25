import { gql } from "graphql-request";

export const GET_ALL_PROPOSALS_CREATED = gql`
  query GetAll($endBlock: Int, $startBlock: Int) {
    nouns {
      nounsEvents(
        filter: {
          nounsEventTypes: NOUNS_BUILDER_GOVERNOR_EVENT
          timeFilter: { endBlock: $endBlock, startBlock: $startBlock }
        }
        networks: { network: ETHEREUM, chain: GOERLI }
        sort: { sortKey: CREATED, sortDirection: DESC }
      ) {
        nodes {
          collectionAddress
          transactionInfo {
            blockNumber
          }
          properties {
            ... on NounsBuilderGovernorEvent {
              properties {
                ... on NounsBuilderGovernorProposalCreatedEventProperties {
                  __typename
                  description
                  proposalId
                }
              }
            }
          }
        }
      }
    }
  }
`;