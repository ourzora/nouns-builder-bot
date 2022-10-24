import request from "graphql-request";
import { GET_ALL_AUCTIONS } from "../graphql/auctionsQueries";
import { AuctionCreated } from "../interfaces/auctionInterfaces";

export const getAuctionEvents = async (
  startBlock: number,
  endBlock: number
): Promise<any> => {
  if (startBlock == null || endBlock == null) {
    return;
  }

  try {
    const auctionEvents = await request(
      "https://api.zora.co/graphql?X-ENABLE-NOUNS=true",
      GET_ALL_AUCTIONS,
      {
        endBlock: endBlock,
        startBlock: startBlock,
      },
      {
        "Content-Type": "application/json",
      }
    );

    return auctionEvents.nouns.nounsEvents.nodes;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const fetchAuctionEvents = async (
  startBlock: number,
  endBlock: number
): Promise<AuctionCreated[]> => {
  const auctionEvents = await getAuctionEvents(startBlock, endBlock);
  const events: AuctionCreated[] = [];

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

fetchAuctionEvents(7816592, 7817142);