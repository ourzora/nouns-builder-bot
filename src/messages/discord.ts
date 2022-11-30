import {
  AuctionBid,
  AuctionCreated,
  AuctionSettled,
} from "../interfaces/auctionInterfaces";
import { Proposal } from "../interfaces/governorInterfaces";
import { DaoDeployed } from "../interfaces/managerInterfaces";
import { DaoEvents } from "../types/types";
import { checkIfEnsExists } from "./utils";
import { MessageEmbed } from "discord.js";

export const discordMessages = (event: DaoEvents) => {
  switch (event.eventType) {
    case "AuctionCreated":
      return createMessageAuctionCreatedDiscord(event);
    case "AuctionBid":
      return createMessageAuctionBidDiscord(event);
    case "AuctionSettled":
      return createMessageAuctionSettledDiscord(event);
    case "ProposalCreated":
      return createMessageProposalCreatedDiscord(event);
    case "DaoDeployed":
      return createMessageDaoDeployedDiscord(event);
  }
};

export const createMessageDaoDeployedDiscord = async (dao: DaoDeployed) => {
  return new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(`🛠 New DAO created: ${dao.name} ($${dao.symbol})`)
    .setURL(`https://nouns.build/dao/${dao.collectionAddress}`)
    .setTimestamp();
};

export const createMessageAuctionCreatedDiscord = async (
  auction: AuctionCreated
) => {
  return new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(
      `✨ New auction created: ${auction.name} ($${auction.symbol}) token ${auction.tokenId}`
    )
    .setURL(
      `https://nouns.build/dao/${auction.collectionAddress}/${auction.tokenId}`
    )
    .setTimestamp()
    .setImage(auction.tokenImage);
};

export const createMessageProposalCreatedDiscord = async (
  proposal: Proposal
) => {
  return new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(
      `📬 New proposal created for ${proposal.name} ($${proposal.symbol})`
    )
    .setURL(
      `https://nouns.build/dao/${proposal.collectionAddress}/vote/${proposal.proposalId}`
    )
    .setTimestamp();
};

export const createMessageAuctionSettledDiscord = async (
  auction: AuctionSettled
) => {
  return new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(
      `💖 Auction for ${auction.name} ($${auction.symbol}) token ${
        auction.tokenId
      } won by ${await checkIfEnsExists(auction.winner)} for ${
        auction.amountPrice
      } ETH`
    )
    .setURL(
      `https://nouns.build/dao/${auction.collectionAddress}/${auction.tokenId}`
    )
    .setTimestamp()
    .setImage(auction.tokenImage);
};

export const createMessageAuctionBidDiscord = async (
  auctionBid: AuctionBid
) => {
  return new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(
      `💸 New bid of ${auctionBid.amountPrice} ETH placed for ${
        auctionBid.name
      } ($${auctionBid.symbol}) token ${
        auctionBid.tokenId
      } by ${await checkIfEnsExists(auctionBid.bidder)}`
    )
    .setURL(
      `https://nouns.build/dao/${auctionBid.collectionAddress}/${auctionBid.tokenId}`
    )
    .setTimestamp()
    .setImage(auctionBid.tokenImage);
};
