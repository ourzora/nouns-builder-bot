import { rpcProvider } from "./config";
import { AuctionBid, AuctionCreated } from "./interfaces/auctionInterfaces";
import { Proposal } from "./interfaces/governorInterfaces";
import { DaoDeployed } from "./interfaces/managerInterfaces";
import { DaoEvents } from "./types/types";


export const messages = (event: DaoEvents) => {
  switch (event.eventType) {
    case "AuctionCreated":
      return createMessageAuctionCreated(event);
    case "AuctionBid":
        return createMessageAuctionBid(event);
    case "ProposalCreated":
      return createMessageProposalCreated(event);
    case "DaoDeployed":
      return createMessageDaoDeployed(event);
  }
};

export const createMessageDaoDeployed = async (dao: DaoDeployed) => {
  return `🛠 New DAO created: ${dao.name} ($${dao.symbol}) https://nouns.build/dao/${dao.collectionAddress}`;
};

export const createMessageAuctionCreated = async (auction: AuctionCreated) => {
  return `✨ New auction created for ${auction.name} ($${auction.symbol}) token ${auction.tokenId} https://nouns.build/dao/${auction.collectionAddress}/${auction.tokenId}`;
};

export const createMessageProposalCreated = async (proposal: Proposal) => {
  return `📬 New proposal created for ${proposal.name} ($${proposal.symbol}) https://nouns.build/dao/${proposal.collectionAddress}/vote/${proposal.proposalId}`;
};

export const createMessageAuctionBid = async (auctionBid: AuctionBid) => {
  return `💸 New bid of ${auctionBid.amountPrice} ETH placed for ${
    auctionBid.name
  } ($${auctionBid.symbol}) token ${
    auctionBid.tokenId
  } by ${await checkIfEnsExists(auctionBid.bidder)} https://nouns.build/dao/${
    auctionBid.collectionAddress
  }/${auctionBid.tokenId}`;
}


const checkIfEnsExists = async (address: string) => {
  try {
    const ensAddress = await rpcProvider.lookupAddress(address);

    if (ensAddress) {
      return ensAddress;
    }

    return address;
  } catch (error) {
    console.log(error);
    return address;
  }
};