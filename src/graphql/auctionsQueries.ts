import { gql } from "graphql-request";

export const GET_ALL_AUCTIONS = gql`
  query GetAllAuctions($endBlock: Int, $startBlock: Int) {
    nouns {
      nounsEvents(
        filter: {
          nounsEventTypes: NOUNS_BUILDER_AUCTION_EVENT
          timeFilter: { endBlock: $endBlock, startBlock: $startBlock }
          nounsBuilderAuctionEventType: NOUNS_BUILDER_AUCTION_AUCTION_CREATED_EVENT
        }
        networks: { network: ETHEREUM, chain: MAINNET }
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


export const GET_ALL_BIDS = gql`
  query GetAllBids($endBlock: Int, $startBlock: Int) {
    nouns {
      nounsEvents(
        filter: {
          nounsEventTypes: NOUNS_BUILDER_AUCTION_EVENT
          timeFilter: { endBlock: $endBlock, startBlock: $startBlock }
          nounsBuilderAuctionEventType: NOUNS_BUILDER_AUCTION_AUCTION_BID_EVENT
        }
        networks: { network: ETHEREUM, chain: MAINNET }
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
                ... on NounsBuilderAuctionAuctionBidEventProperties {
                  __typename
                  bidder
                  tokenId
                  amountPrice {
                    chainTokenPrice {
                      decimal
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;