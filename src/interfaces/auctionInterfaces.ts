export interface AuctionCreated {
  eventType: "AuctionCreated";
  blockNumber: number;
  collectionAddress: string;
  tokenId: number;
  name: string;
  symbol: string;
}

export interface AuctionBid {
  eventType: "AuctionBid";
  blockNumber: number;
  collectionAddress: string;
  tokenId: number;
  name: string;
  symbol: string;
  amountPrice: number;
  bidder: string;
  auctionTweetId: string;
}

