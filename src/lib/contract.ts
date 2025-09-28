// lib/contract.ts
import { createPublicClient, http } from "viem";
import { worldchainSepolia } from "viem/chains";
import WorldCircleABI from "./WorldCircle.json";

export const WORLDCIRCLE_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // <-- replace with deployed contract

// export const client = createPublicClient({
//   chain: localhost,
//   transport: http("http://127.0.0.1:8545"),
// });

export const client = createPublicClient({
  chain: worldchainSepolia,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
});

// export const client = createPublicClient({
//   chain: localhost,
//   transport: http("https://worldchain-mainnet.g.alchemy.com/public"),
// });

export const WorldCircle = {
  address: WORLDCIRCLE_ADDRESS,
  abi: WorldCircleABI.abi,
};
