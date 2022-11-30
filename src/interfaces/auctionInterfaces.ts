export interface AuctionCreated {
  eventType: "AuctionCreated";
  logIndex: number;
  blockNumber: number;
  collectionAddress: string;
  tokenId: number;
  name: string;
  symbol: string;
  tokenImage: string;
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
  tokenImage: string;
}

export interface AuctionSettled {
  eventType: "AuctionSettled";
  blockNumber: number;
  logIndex: number;
  collectionAddress: string;
  tokenId: number;
  name: string;
  symbol: string;
  amountPrice: number;
  winner: string;
  tokenImage: string;
}

