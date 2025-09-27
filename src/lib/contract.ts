// lib/contract.ts
import WorldCircleABI from "./WorldCircle.json";
import { createPublicClient, http } from "viem";
import { worldchain, localhost } from "viem/chains";

export const WORLDCIRCLE_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // <-- replace with deployed contract

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
