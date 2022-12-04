import {
  AuctionBid,
  AuctionCreated,
  AuctionSettled,
} from '../interfaces/auctionInterfaces';
import { Proposal } from '../interfaces/governorInterfaces';
import { DaoDeployed } from '../interfaces/managerInterfaces';
import { DaoEvents } from '../types/types';
import { checkIfEnsExists } from './utils';

export const twitterMessages = (event: DaoEvents) => {
  switch (event.eventType) {
    case 'AuctionCreated':
      return createMessageAuctionCreatedTwitter(event);
    case 'AuctionBid':
      return createMessageAuctionBidTwitter(event);
    case 'AuctionSettled':
      return createMessageAuctionSettledTwitter(event);
    case 'ProposalCreated':
      return createMessageProposalCreatedTwitter(event);
    // case "DaoDeployed":
    //   return createMessageDaoDeployedTwitter(event);
  }
};

// export const createMessageDaoDeployedTwitter = async (dao: DaoDeployed) => {
//   return `🛠 New DAO created: ${dao.name} ($${dao.symbol}) https://nouns.build/dao/${dao.collectionAddress}`;
// };

export const createMessageAuctionCreatedTwitter = async (
  auction: AuctionCreated
) => {
  return `✣ New auction created for ${auction.name} ($${auction.symbol}) token ${auction.tokenId} https://nouns.build/dao/${auction.collectionAddress}/${auction.tokenId}`;
};

export const createMessageProposalCreatedTwitter = async (
  proposal: Proposal
) => {
  return `✶ New proposal created by ${await checkIfEnsExists(
    proposal.proposer
  )} https://nouns.build/dao/${proposal.collectionAddress}/vote/${
    proposal.proposalId
  }`;
};

export const createMessageAuctionSettledTwitter = async (
  auction: AuctionSettled
) => {
  return `✮ Auction for ${auction.name} ($${auction.symbol}) token ${
    auction.tokenId
  } won by ${await checkIfEnsExists(auction.winner)} for ${
    auction.amountPrice
  } ETH https://nouns.build/dao/${auction.collectionAddress}/${
    auction.tokenId
  }`;
};

export const createMessageAuctionBidTwitter = async (
  auctionBid: AuctionBid
) => {
  return `✧ New bid of ${auctionBid.amountPrice} ETH placed for ${
    auctionBid.name
  } ($${auctionBid.symbol}) token ${
    auctionBid.tokenId
  } by ${await checkIfEnsExists(auctionBid.bidder)} https://nouns.build/dao/${
    auctionBid.collectionAddress
  }/${auctionBid.tokenId}`;
};
