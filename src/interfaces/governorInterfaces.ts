export interface Proposal {
  eventType: "ProposalCreated";
  blockNumber: number;
  collectionAddress: string;
  description: string;
  proposalId: string;
}
