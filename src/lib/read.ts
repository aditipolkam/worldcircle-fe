// lib/readWorldCircle.ts
import { client, WorldCircle } from "./contract";

export async function getConnections(worldId: number) {
  return client.readContract({
    address: WorldCircle.address as `0x${string}`,
    abi: WorldCircle.abi,
    functionName: "getConnections",
    args: [BigInt(worldId)],
  });
}

export async function getConnectionsByEvent(worldId: number, eventId: number) {
  return client.readContract({
    address: WorldCircle.address as `0x${string}`,
    abi: WorldCircle.abi,
    functionName: "getConnectionsByEvent",
    args: [BigInt(worldId), BigInt(eventId)],
  });
}

export async function getEventParticipants(eventId: number) {
  return client.readContract({
    address: WorldCircle.address as `0x${string}`,
    abi: WorldCircle.abi,
    functionName: "getEventParticipants",
    args: [BigInt(eventId)],
  });
}
