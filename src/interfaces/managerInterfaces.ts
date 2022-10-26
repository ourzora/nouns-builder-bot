export interface DaoDeployed {
    eventType: "DaoDeployed";
    blockNumber: number;
    collectionAddress: string;
    name: string;
    symbol: string;
}