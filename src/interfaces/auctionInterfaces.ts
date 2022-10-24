export interface Auction {
  eventType: "AuctionCreated";
  blockNumber: number;
  collectionAddress: string;
  tokenId: number;
}
