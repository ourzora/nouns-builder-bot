import {
  AuctionBid,
  AuctionCreated,
  AuctionSettled,
} from "../interfaces/auctionInterfaces";
import { Proposal } from "../interfaces/governorInterfaces";
import { DaoDeployed } from "../interfaces/managerInterfaces";

export type DaoEvents =
  | AuctionCreated
  | Proposal
  | DaoDeployed
  | AuctionBid
  | AuctionSettled;
