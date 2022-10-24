import { AuctionCreated } from "./interfaces/auctionInterfaces";
import { DaoDeployed } from "./interfaces/managerInterfaces";

export const createMessageDaoDeployed = async (dao: DaoDeployed) => {
  return `🛠 New DAO created https://nouns.build/dao/${dao.collectionAddress}`;
};

export const createMessageAuctionCreated = async (auction: AuctionCreated) => {
  return `🛠 New Auction for https://nouns.build/dao/${auction.collectionAddress}/${auction.tokenId}`;
};
