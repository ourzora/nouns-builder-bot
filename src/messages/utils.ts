import { rpcProvider } from "../config";

export const checkIfEnsExists = async (address: string) => {
  try {
    const ensAddress = await rpcProvider.lookupAddress(address);

    if (ensAddress) {
      return ensAddress;
    }

    return address;
  } catch (error) {
    console.log(error);
    return address;
  }
};