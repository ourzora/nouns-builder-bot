import { gql } from "graphql-request";

export const GET_ALL_PROPOSALS_CREATED = gql`
  query GetAllProposalsCreated(
    $endBlock: Int
    $startBlock: Int
    $collectionAddresses: [String!]
  ) {
    nouns {
      nounsEvents(
        filter: {
          nounsEventTypes: NOUNS_BUILDER_GOVERNOR_EVENT
          timeFilter: { endBlock: $endBlock, startBlock: $startBlock }
          nounsBuilderGovernorEventType: NOUNS_BUILDER_GOVERNOR_PROPOSAL_CREATED_EVENT
        }
        networks: { network: ETHEREUM, chain: MAINNET }
        sort: { sortKey: CREATED, sortDirection: DESC }
        where: { collectionAddresses: $collectionAddresses }
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
                  proposer
                }
              }
            }
          }
        }
      }
    }
  }
`;