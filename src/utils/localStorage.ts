import { Event } from "@/types/event";
import { Connection } from "@/types/connection";

// Event utilities
export const saveEvent = (event: Event): void => {
  try {
    const existingEvents = getEvents();
    const updatedEvents = [...existingEvents, event];
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  } catch (error) {
    console.error("Failed to save event:", error);
    throw error;
  }
};

export const getEvents = (): Event[] => {
  try {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : [];
  } catch (error) {
    console.error("Failed to load events:", error);
    return [];
  }
};

// Connection utilities
export const saveConnection = (connection: Connection): void => {
  try {
    const existingConnections = getConnections();
    const updatedConnections = [...existingConnections, connection];
    localStorage.setItem("connections", JSON.stringify(updatedConnections));
  } catch (error) {
    console.error("Failed to save connection:", error);
    throw error;
  }
};

export const getConnections = (): Connection[] => {
  try {
    const storedConnections = localStorage.getItem("connections");
    return storedConnections ? JSON.parse(storedConnections) : [];
  } catch (error) {
    console.error("Failed to load connections:", error);
    return [];
  }
};

// Clear all data (useful for testing/demo reset)
export const clearAllData = (): void => {
  localStorage.removeItem("events");
  localStorage.removeItem("connections");
};
