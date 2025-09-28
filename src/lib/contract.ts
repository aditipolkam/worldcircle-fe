// lib/contract.ts
import { createPublicClient, http } from "viem";
import { localhost } from "viem/chains";
import WorldCircleABI from "./WorldCircle.json";

export const WORLDCIRCLE_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // <-- replace with deployed contract

export const client = createPublicClient({
  chain: localhost,
  transport: http("http://127.0.0.1:8545"),
});

// export const client = createPublicClient({
//   chain: localhost,
//   transport: http("https://worldchain-mainnet.g.alchemy.com/public"),
// });

export const WorldCircle = {
  address: WORLDCIRCLE_ADDRESS,
  abi: WorldCircleABI.abi,
};
