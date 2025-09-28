export interface Connection {
  id: string;
  worldId: string;
  worldAddress: string;
  notes: string;
  createdAt: string;
  connectedBy: string; // The person who made the connection
}
