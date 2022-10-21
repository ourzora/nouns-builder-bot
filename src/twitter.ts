import { DaoDeployed } from "./interfaces/managerInterfaces";

export const createMessageDaoDeployed = async (dao: DaoDeployed) => {
  return `🛠 New DAO created https://nouns.build/dao/${dao.collectionAddress}`;
};
