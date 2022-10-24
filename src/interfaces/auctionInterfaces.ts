export interface AuctionCreated {
  eventType: "AuctionCreated";
  blockNumber: number;
  collectionAddress: string;
  tokenId: number;
}
