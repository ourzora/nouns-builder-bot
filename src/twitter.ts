import { Auction } from "./interfaces/auctionInterfaces";
import { Proposal } from "./interfaces/governorInterfaces";
import { DaoDeployed } from "./interfaces/managerInterfaces";
import { DaoEvents } from "./types/types";


export const messages = (event: DaoEvents) => {
  switch (event.eventType) {
    case "AuctionCreated":
      return createMessageAuctionCreated(event);
    case "ProposalCreated":
      return createMessageProposalCreated(event);
    case "DaoDeployed":
      return createMessageDaoDeployed(event);
  }
};

export const createMessageDaoDeployed = async (dao: DaoDeployed) => {
  return `🛠 New DAO created https://nouns.build/dao/${dao.collectionAddress}`;
};

export const createMessageAuctionCreated = async (auction: Auction) => {
  return `🛠 New Auction for https://nouns.build/dao/${auction.collectionAddress}/${auction.tokenId}`;
};

export const createMessageProposalCreated = async (proposal: Proposal) => {
  return `🛠 New Proposal created for https://nouns.build/dao/${proposal.collectionAddress}/${proposal.proposalId}`;
};