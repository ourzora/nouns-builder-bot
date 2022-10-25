import { Auction } from "../interfaces/auctionInterfaces";
import { Proposal } from "../interfaces/governorInterfaces";
import { DaoDeployed } from "../interfaces/managerInterfaces";

export type DaoEvents = Auction | Proposal | DaoDeployed;
