// lib/contract.ts
import { createPublicClient, http } from "viem";
import { worldchainSepolia } from "viem/chains";
import WorldCircleABI from "./WorldCircle.json";

export const WORLDCIRCLE_ADDRESS = "0x060aEE03C73DCFE921a775f99bf997ADD518f3B0";
console.log(process.env.NEXT_PUBLIC_RPC_URL);
export const client = createPublicClient({
  chain: worldchainSepolia,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
});

export const WorldCircle = {
  address: WORLDCIRCLE_ADDRESS,
  abi: WorldCircleABI.abi,
};
