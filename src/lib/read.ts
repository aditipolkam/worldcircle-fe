import { client, WorldCircle } from "./contract";

export async function getPerson(personAddress: `0x${string}`) {
  console.log("person get");
  console.log({ personAddress });

  const person = await client.readContract({
    address: WorldCircle.address as `0x${string}`,
    abi: WorldCircle.abi,
    functionName: "people",
    args: [personAddress],
  });

  console.log({ person });

  return client.readContract({
    address: WorldCircle.address as `0x${string}`,
    abi: WorldCircle.abi,
    functionName: "people",
    args: [personAddress],
  }) as Promise<[string, string, string, string, string, boolean]>;
  // Returns: [worldId, name, bio, location, company, isSelfVerified]
}
export async function getConnections(address: string) {
  return client.readContract({
    address: WorldCircle.address as `0x${string}`,
    abi: WorldCircle.abi,
    functionName: "getConnections",
    args: [address],
  });
}

export async function getConnectionsByEvent(address: string, eventId: number) {
  return client.readContract({
    address: WorldCircle.address as `0x${string}`,
    abi: WorldCircle.abi,
    functionName: "getConnectionsByEvent",
    args: [address, BigInt(eventId)],
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
