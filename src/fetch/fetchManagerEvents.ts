import request from "graphql-request";
import { GET_ALL_NEW_DAOS } from "../graphql/managerQueries";
import { DaoDeployed } from "../interfaces/managerInterfaces";

export const getDaosDeployedEvents = async (
  startBlock: number,
  endBlock: number
): Promise<any> => {
  if (startBlock == null || endBlock == null) {
    return;
  }

  try {
    const deployedEvents = await request(
      "https://api.zora.co/graphql?X-ENABLE-NOUNS=true",
      GET_ALL_NEW_DAOS,
      {
        endBlock: endBlock,
        startBlock: startBlock,
      },
      {
        "Content-Type": "application/json",
      }
    );
    return deployedEvents.nouns.nounsEvents.nodes;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const fetchDaoDeployedEvents = async (
  startBlock: number,
  endBlock: number
): Promise<DaoDeployed[]> => {
  const daoDeployedEvents = await getDaosDeployedEvents(startBlock, endBlock);
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
