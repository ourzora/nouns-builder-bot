import { gql } from "graphql-request";

export const GET_ALL_AUCTIONS = gql`
  query GetAllAuctions($endBlock: Int, $startBlock: Int) {
    nouns {
      nounsEvents(
        filter: {
          nounsEventTypes: NOUNS_BUILDER_AUCTION_EVENT
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
            ... on NounsBuilderAuctionEvent {
              __typename
              nounsBuilderAuctionEventType
              properties {
                ... on NounsBuilderAuctionAuctionCreatedEventProperties {
                  __typename
                  tokenId
                }
              }
            }
          }
        }
      }
    }
  }
`;
