"use client";

import { Page } from "@/components/PageLayout";
import { TopBar } from "@worldcoin/mini-apps-ui-kit-react";
import { useEffect, useState } from "react";
import { Connection } from "@/types/connection";
import { getConnections } from "@/utils/localStorage";

interface Profile {
  id: string;
  name: string;
  username: string;
  profilePicture: string;
  isOnline: boolean;
  worldId: string;
  worldAddress: string;
  notes: string;
}

interface LocationData {
  id: string;
  name: string;
  country: string;
  coordinates: { x: number; y: number };
  profiles: Profile[];
}

// Predefined locations for assignment
const AVAILABLE_LOCATIONS = [
  {
    id: "sf",
    name: "San Francisco",
    country: "USA",
    coordinates: { x: 15, y: 35 },
  },
  { id: "ny", name: "New York", country: "USA", coordinates: { x: 25, y: 30 } },
  {
    id: "london",
    name: "London",
    country: "UK",
    coordinates: { x: 50, y: 25 },
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    coordinates: { x: 80, y: 30 },
  },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    coordinates: { x: 85, y: 70 },
  },
  {
    id: "berlin",
    name: "Berlin",
    country: "Germany",
    coordinates: { x: 52, y: 28 },
  },
  {
    id: "toronto",
    name: "Toronto",
    country: "Canada",
    coordinates: { x: 22, y: 32 },
  },
  {
    id: "mumbai",
    name: "Mumbai",
    country: "India",
    coordinates: { x: 70, y: 45 },
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    coordinates: { x: 75, y: 55 },
  },
  {
    id: "saopaulo",
    name: "São Paulo",
    country: "Brazil",
    coordinates: { x: 30, y: 65 },
  },
];

// Function to assign location based on worldId (deterministic)
const assignLocationToConnection = (connection: Connection) => {
  // Use worldId hash to deterministically assign location
  const hash = connection.worldId.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
  const locationIndex = Math.abs(hash) % AVAILABLE_LOCATIONS.length;
  return AVAILABLE_LOCATIONS[locationIndex];
};

// Transform connections into location data
const transformConnectionsToLocations = (
  connections: Connection[]
): LocationData[] => {
  const locationMap = new Map<string, LocationData>();

  connections.forEach((connection) => {
    const assignedLocation = assignLocationToConnection(connection);

    const profile: Profile = {
      id: connection.id,
      name: connection.worldId || `User ${connection.id}`,
      username: connection.worldId.toLowerCase() || `user${connection.id}`,
      profilePicture: `https://images.unsplash.com/photo-${
        1472099645785 + parseInt(connection.id.slice(-3)) || 1
      }?w=100&h=100&fit=crop&crop=face`,
      isOnline: Math.random() > 0.3, // Random online status for demo
      worldId: connection.worldId,
      worldAddress: connection.worldAddress,
      notes: connection.notes,
    };

    if (locationMap.has(assignedLocation.id)) {
      locationMap.get(assignedLocation.id)!.profiles.push(profile);
    } else {
      locationMap.set(assignedLocation.id, {
        ...assignedLocation,
        profiles: [profile],
      });
    }
  });

  return Array.from(locationMap.values());
};

export default function WorldCircles() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [locationData, setLocationData] = useState<LocationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadConnections = () => {
    try {
      const storedConnections = getConnections();
      setConnections(storedConnections);

      if (storedConnections.length > 0) {
        const transformedData =
          transformConnectionsToLocations(storedConnections);
        setLocationData(transformedData);
      } else {
        setLocationData([]);
      }
    } catch (error) {
      console.error("Failed to load connections:", error);
      setLocationData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadConnections();

    // Refresh when page becomes visible
    const handleFocus = () => {
      loadConnections();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <>
      <Page.Header className="p-0">
        <TopBar title="World Circles" />
      </Page.Header>

      <Page.Main className="mb-16">
        <div className="px-4 py-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Explore World Circles</h1>
            <p className="text-gray-600">
              Connect with people around the globe
            </p>
            {connections.length > 0 && (
              <p className="text-sm text-blue-600 mt-2">
                {connections.length} connection
                {connections.length !== 1 ? "s" : ""} across{" "}
                {locationData.length} location
                {locationData.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading connections...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && connections.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                No Connections Yet
              </h2>
              <p className="text-gray-600 mb-4">
                Start connecting with people to see them on the world map!
              </p>
              <p className="text-sm text-gray-500">
                Use the QR scanner or share your profile link to add
                connections.
              </p>
            </div>
          )}

          {/* Globe Visualization - Only show if we have connections */}
          {!isLoading && locationData.length > 0 && (
            <>
              {/* Globe Container */}
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mb-6">
                <div className="relative w-full h-80 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-2xl overflow-hidden">
                  {/* Globe Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"></div>
                  </div>

                  {/* Location Circles with Profile Pictures */}
                  {locationData.map((location) => (
                    <div
                      key={location.id}
                      className="absolute group cursor-pointer"
                      style={{
                        left: `${location.coordinates.x}%`,
                        top: `${location.coordinates.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {/* Profile Pictures Circle */}
                      <div className="relative">
                        <div className="w-16 h-16 bg-white rounded-full shadow-lg border-2 border-blue-500 p-1 group-hover:scale-110 transition-transform duration-200">
                          <div className="w-full h-full rounded-full overflow-hidden relative">
                            {/* Main Profile Picture */}
                            <img
                              src={location.profiles[0]?.profilePicture}
                              alt={location.profiles[0]?.name}
                              className="w-full h-full object-cover"
                            />

                            {/* Additional Profile Pictures Overlay */}
                            {location.profiles.length > 1 && (
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white overflow-hidden">
                                <img
                                  src={location.profiles[1]?.profilePicture}
                                  alt={location.profiles[1]?.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}

                            {/* More Profiles Indicator */}
                            {location.profiles.length > 2 && (
                              <div className="absolute -top-1 -left-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  +{location.profiles.length - 2}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Online Indicator */}
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
                          <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>

                      {/* Location Label */}
                      <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        {location.name}, {location.country}
                      </div>

                      {/* Profile Preview on Hover */}
                      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 min-w-48 z-10">
                        <h4 className="font-semibold text-sm mb-2">
                          {location.name}
                        </h4>
                        <div className="space-y-2">
                          {location.profiles.slice(0, 3).map((profile) => (
                            <div
                              key={profile.id}
                              className="flex items-center gap-2"
                            >
                              <img
                                src={profile.profilePicture}
                                alt={profile.name}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <span className="text-xs font-medium block">
                                  {profile.name}
                                </span>
                                {profile.notes && (
                                  <span className="text-xs text-gray-500 truncate block">
                                    {profile.notes}
                                  </span>
                                )}
                              </div>
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  profile.isOnline
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                                }`}
                              ></div>
                            </div>
                          ))}
                          {location.profiles.length > 3 && (
                            <p className="text-xs text-gray-500">
                              +{location.profiles.length - 3} more
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location List */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold mb-4">All Locations</h2>
                {locationData.map((location) => (
                  <div
                    key={location.id}
                    className="block bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold">
                            {location.profiles.length}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{location.name}</h3>
                          <p className="text-sm text-gray-600">
                            {location.country}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {location.profiles.slice(0, 3).map((profile) => (
                            <img
                              key={profile.id}
                              src={profile.profilePicture}
                              alt={profile.name}
                              className="w-8 h-8 rounded-full border-2 border-white object-cover"
                            />
                          ))}
                          {location.profiles.length > 3 && (
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-600">
                                +{location.profiles.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                        <span className="text-gray-400">→</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Page.Main>
    </>
  );
}
