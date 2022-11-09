import { gql } from "graphql-request";

export const GET_ALL_AUCTIONS_CREATED = gql`
  query GetAllAuctionsCreated(
    $endBlock: Int
    $startBlock: Int
    $collectionAddresses: [String!]
  ) {
    nouns {
      nounsEvents(
        filter: {
          nounsEventTypes: NOUNS_BUILDER_AUCTION_EVENT
          timeFilter: { endBlock: $endBlock, startBlock: $startBlock }
          nounsBuilderAuctionEventType: NOUNS_BUILDER_AUCTION_AUCTION_CREATED_EVENT
        }
        networks: { network: ETHEREUM, chain: MAINNET }
        sort: { sortKey: CREATED, sortDirection: DESC }
        where: { collectionAddresses: $collectionAddresses }
      ) {
        nodes {
          collectionAddress
          transactionInfo {
            blockNumber
            logIndex
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
  query GetAllBids(
    $endBlock: Int
    $startBlock: Int
    $collectionAddresses: [String!]
  ) {
    nouns {
      nounsEvents(
        filter: {
          nounsEventTypes: NOUNS_BUILDER_AUCTION_EVENT
          timeFilter: { endBlock: $endBlock, startBlock: $startBlock }
          nounsBuilderAuctionEventType: NOUNS_BUILDER_AUCTION_AUCTION_BID_EVENT
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

export const GET_AUCTION_SETTLED_EVENTS = gql`
  query GetAllAuctionSettledEvents(
    $endBlock: Int
    $startBlock: Int
    $collectionAddresses: [String!]
  ) {
    nouns {
      nounsEvents(
        filter: {
          nounsEventTypes: NOUNS_BUILDER_AUCTION_EVENT
          timeFilter: { endBlock: $endBlock, startBlock: $startBlock }
          nounsBuilderAuctionEventType: NOUNS_BUILDER_AUCTION_AUCTION_SETTLED_EVENT
        }
        networks: { network: ETHEREUM, chain: MAINNET }
        sort: { sortKey: CREATED, sortDirection: DESC }
        where: { collectionAddresses: $collectionAddresses }
      ) {
        nodes {
          collectionAddress
          transactionInfo {
            blockNumber
            logIndex
          }
          properties {
            ... on NounsBuilderAuctionEvent {
              __typename
              nounsBuilderAuctionEventType
              properties {
                ... on NounsBuilderAuctionAuctionSettledEventProperties {
                  __typename
                  amountPrice {
                    chainTokenPrice {
                      decimal
                    }
                  }
                  tokenId
                  winner
                }
              }
            }
          }
        }
      }
    }
  }
`;
