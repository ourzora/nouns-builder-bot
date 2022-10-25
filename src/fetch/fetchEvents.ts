import request from "graphql-request";
import { GET_ALL_NEW_DAOS } from "../graphql/managerQueries";
import { DaoDeployed } from "../interfaces/managerInterfaces";
import { GET_ALL_AUCTIONS } from "../graphql/auctionsQueries";
import { Auction } from "../interfaces/auctionInterfaces";
import { GET_ALL_PROPOSALS_CREATED } from "../graphql/governorQueries";
import { Proposal } from "../interfaces/governorInterfaces";
import { DaoEvents } from "../types/types";

export const getEvents = async (
  startBlock: number,
  endBlock: number,
  query: string
): Promise<any> => {
  if (startBlock == null || endBlock == null) {
    return;
  }

  try {
    const events = await request(
      "https://api.zora.co/graphql?X-ENABLE-NOUNS=true",
      query,
      {
        endBlock: endBlock,
        startBlock: startBlock,
      },
      {
        "Content-Type": "application/json",
      }
    );
    return events.nouns.nounsEvents.nodes;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const fetchEvents = async (
  startBlock: number,
  endBlock: number
): Promise<DaoEvents[]> => {
  const managerEvents = await fetchDaoDeployedEvents(startBlock, endBlock);
  const auctionEvents = await fetchAuctionEvents(startBlock, endBlock);
  const governorEvents = await fetchGovernorEvents(startBlock, endBlock);

  const events: DaoEvents[] = [
    ...managerEvents,
    ...auctionEvents,
    ...governorEvents,
  ];
  return events.sort((a, b) => a.blockNumber - b.blockNumber);
};

// get manager events
export const fetchDaoDeployedEvents = async (
  startBlock: number,
  endBlock: number
): Promise<DaoDeployed[]> => {
  const daoDeployedEvents = await getEvents(
    startBlock,
    endBlock,
    GET_ALL_NEW_DAOS
  );
  const daos: DaoDeployed[] = [];

  for (const i in daoDeployedEvents) {
    daos.push({
      eventType: "DaoDeployed",
      blockNumber: daoDeployedEvents[i].blockNumber,
      collectionAddress: daoDeployedEvents[i].collectionAddress,
    });
  }

  return daos;
};

// get auction events
export const fetchAuctionEvents = async (
  startBlock: number,
  endBlock: number
): Promise<Auction[]> => {
  const auctionEvents = await getEvents(startBlock, endBlock, GET_ALL_AUCTIONS);
  const events: Auction[] = [];

  for (const i in auctionEvents) {
    if (auctionEvents[i].properties.properties.tokenId != null) {
      events.push({
        eventType: "AuctionCreated",
        blockNumber: auctionEvents[i].transactionInfo.blockNumber,
        collectionAddress: auctionEvents[i].collectionAddress,
        tokenId: auctionEvents[i].properties.properties.tokenId,
      });
    }
  }

  return events;
};

// get governor events
export const fetchGovernorEvents = async (
  startBlock: number,
  endBlock: number
): Promise<Proposal[]> => {
  const governorEvents = await getEvents(
    startBlock,
    endBlock,
    GET_ALL_PROPOSALS_CREATED
  );
  const events: Proposal[] = [];

  for (const i in governorEvents) {
    if (governorEvents[i].properties.properties.tokenId != null) {
      events.push({
        eventType: "ProposalCreated",
        blockNumber: governorEvents[i].transactionInfo.blockNumber,
        collectionAddress: governorEvents[i].collectionAddress,
        description: governorEvents[i].properties.properties.description,
        proposalId: governorEvents[i].properties.properties.proposalId,
      });
    }
  }

  return events;
};
