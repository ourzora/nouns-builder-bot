import { GET_ALL_NEW_DAOS } from "../graphql/managerQueries";
import { DaoDeployed } from "../interfaces/managerInterfaces";
import {
  GET_ALL_AUCTIONS_CREATED,
  GET_ALL_BIDS,
  GET_AUCTION_SETTLED_EVENTS,
} from "../graphql/auctionsQueries";
import {
  AuctionBid,
  AuctionCreated,
  AuctionSettled,
} from "../interfaces/auctionInterfaces";
import { GET_ALL_PROPOSALS_CREATED } from "../graphql/governorQueries";
import { Proposal } from "../interfaces/governorInterfaces";
import { DaoEvents } from "../types/types";
import { GET_DAO_INFO } from "../graphql/daoQueries";
import { GET_TOKEN_IMAGE } from "../graphql/tokenQueries";
import { getDaos, getEvents, getTokenImage } from "./getEvents";

export const fetchEvents = async (
  startBlock: number,
  endBlock: number
): Promise<DaoEvents[]> => {
  const managerEvents = await fetchDaoDeployedEvents(startBlock, endBlock);
  const auctionCreatedEvents = await fetchAuctionCreatedEvents(
    startBlock,
    endBlock
  );
  const auctionBidEvents = await fetchAuctionBidEvents(startBlock, endBlock);
  const governorEvents = await fetchGovernorEvents(startBlock, endBlock);
  const auctionSettledEvents = await fetchAuctionSettledEvents(
    startBlock,
    endBlock
  );

  const sortedAuctionEndedEvents = [
    ...auctionSettledEvents,
    ...auctionCreatedEvents,
  ].sort((a, b) => a.logIndex - b.logIndex);

  const events: DaoEvents[] = [
    ...managerEvents,
    ...auctionBidEvents,
    ...governorEvents,
    ...sortedAuctionEndedEvents,
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
    const daoName = await getDaos(
      daoDeployedEvents[i].collectionAddress,
      GET_DAO_INFO
    );
    daos.push({
      eventType: "DaoDeployed",
      blockNumber: daoDeployedEvents[i].transactionInfo.blockNumber,
      collectionAddress: daoDeployedEvents[i].collectionAddress,
      name: daoName[0].name,
      symbol: daoName[0].symbol,
    });
  }

  return daos;
};

// get auction created events
export const fetchAuctionCreatedEvents = async (
  startBlock: number,
  endBlock: number
): Promise<AuctionCreated[]> => {
  const auctionEvents = await getEvents(
    startBlock,
    endBlock,
    GET_ALL_AUCTIONS_CREATED
  );
  const events: AuctionCreated[] = [];

  for (const i in auctionEvents) {
    if (auctionEvents[i].properties.properties.tokenId != null) {
      const daoName = await getDaos(
        auctionEvents[i].collectionAddress,
        GET_DAO_INFO
      );
      events.push({
        eventType: "AuctionCreated",
        logIndex: auctionEvents[i].transactionInfo.logIndex,
        blockNumber: auctionEvents[i].transactionInfo.blockNumber,
        collectionAddress: auctionEvents[i].collectionAddress,
        tokenId: auctionEvents[i].properties.properties.tokenId,
        name: daoName[0].name,
        symbol: daoName[0].symbol,
        tokenImage: await getTokenImage(
          auctionEvents[i].collectionAddress,
          auctionEvents[i].properties.properties.tokenId,
          GET_TOKEN_IMAGE
        ),
      });
    }
  }

  return events;
};

// get auction bid events
export const fetchAuctionBidEvents = async (
  startBlock: number,
  endBlock: number
): Promise<AuctionBid[]> => {
  const auctionEvents = await getEvents(startBlock, endBlock, GET_ALL_BIDS);
  const events: AuctionBid[] = [];

  for (const i in auctionEvents) {
    if (auctionEvents[i].properties.properties.tokenId != null) {
      const daoName = await getDaos(
        auctionEvents[i].collectionAddress,
        GET_DAO_INFO
      );

      events.push({
        eventType: "AuctionBid",
        blockNumber: auctionEvents[i].transactionInfo.blockNumber,
        collectionAddress: auctionEvents[i].collectionAddress,
        tokenId: auctionEvents[i].properties.properties.tokenId,
        name: daoName[0].name,
        symbol: daoName[0].symbol,
        amountPrice:
          auctionEvents[i].properties.properties.amountPrice.chainTokenPrice
            .decimal,
        bidder: auctionEvents[i].properties.properties.bidder,
        tokenImage: await getTokenImage(
          auctionEvents[i].collectionAddress,
          auctionEvents[i].properties.properties.tokenId,
          GET_TOKEN_IMAGE
        ),
      });
    }
  }

  return events;
};

// get auction settled events
export const fetchAuctionSettledEvents = async (
  startBlock: number,
  endBlock: number
): Promise<AuctionSettled[]> => {
  const auctionEvents = await getEvents(
    startBlock,
    endBlock,
    GET_AUCTION_SETTLED_EVENTS
  );
  const events: AuctionSettled[] = [];

  for (const i in auctionEvents) {
    if (
      auctionEvents[i].properties.properties.tokenId != null &&
      auctionEvents[i].properties.properties.winner !==
        "0x0000000000000000000000000000000000000000"
    ) {
      const daoName = await getDaos(
        auctionEvents[i].collectionAddress,
        GET_DAO_INFO
      );

      events.push({
        eventType: "AuctionSettled",
        logIndex: auctionEvents[i].transactionInfo.logIndex,
        blockNumber: auctionEvents[i].transactionInfo.blockNumber,
        collectionAddress: auctionEvents[i].collectionAddress,
        tokenId: auctionEvents[i].properties.properties.tokenId,
        name: daoName[0].name,
        symbol: daoName[0].symbol,
        amountPrice:
          auctionEvents[i].properties.properties.amountPrice.chainTokenPrice
            .decimal,
        winner: auctionEvents[i].properties.properties.winner,
        tokenImage: await getTokenImage(
          auctionEvents[i].collectionAddress,
          auctionEvents[i].properties.properties.tokenId,
          GET_TOKEN_IMAGE
        ),
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
    const daoName = await getDaos(
      governorEvents[i].collectionAddress,
      GET_DAO_INFO
    );
    events.push({
      eventType: "ProposalCreated",
      blockNumber: governorEvents[i].transactionInfo.blockNumber,
      collectionAddress: governorEvents[i].collectionAddress,
      description: governorEvents[i].properties.properties.description,
      proposalId: governorEvents[i].properties.properties.proposalId,
      proposer: governorEvents[i].properties.properties.proposer,
      name: daoName[0].name,
      symbol: daoName[0].symbol,
    });
  }

  return events;
};
