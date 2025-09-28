"use client";

import { use } from "react";
import Link from "next/link";
import { Page } from "@/components/PageLayout";
// import { TopBar } from '@worldcoin/mini-apps-ui-kit-react';
// import { ArrowLeft } from 'iconoir-react';

// Mock profile data
const mockProfiles = [
  {
    id: "1",
    name: "Alex Chen",
    username: "alexchen",
    profilePicture:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    isInMyCircle: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    username: "sarahj",
    profilePicture:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    isInMyCircle: true,
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    username: "miker",
    profilePicture:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    isInMyCircle: false,
  },
  {
    id: "4",
    name: "Emma Wilson",
    username: "emmaw",
    profilePicture:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    isInMyCircle: true,
  },
  {
    id: "5",
    name: "David Kim",
    username: "davidk",
    profilePicture:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    isInMyCircle: false,
  },
  {
    id: "6",
    name: "Lisa Park",
    username: "lisap",
    profilePicture:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    isInMyCircle: true,
  },
];

// Mock event data - in a real app, this would come from an API
const getEventData = (id: string) => {
  const events = {
    "1": {
      id: "1",
      name: "Tech Meetup 2024",
      date: "2024-02-15",
      time: "6:00 PM - 9:00 PM",
      location: "San Francisco, CA",
      address: "123 Tech Street, San Francisco, CA 94105",
      description:
        "Join us for an exciting evening of networking and tech discussions. We'll cover the latest trends in AI, blockchain, and web development. Perfect for developers, designers, and tech enthusiasts.",
      attendees: 156,
      maxAttendees: 200,
      organizer: "Tech Community SF",
      category: "Technology",
      price: "Free",
      isJoined: true,
    },
    "2": {
      id: "2",
      name: "Design Workshop",
      date: "2024-02-20",
      time: "10:00 AM - 4:00 PM",
      location: "New York, NY",
      address: "456 Design Ave, New York, NY 10001",
      description:
        "A hands-on workshop covering modern design principles, user experience best practices, and creative problem-solving techniques. Bring your laptop and creativity!",
      attendees: 89,
      maxAttendees: 100,
      organizer: "Design Guild NYC",
      category: "Design",
      price: "$50",
      isJoined: false,
    },
    "3": {
      id: "3",
      name: "Blockchain Conference",
      date: "2024-01-30",
      time: "9:00 AM - 6:00 PM",
      location: "Austin, TX",
      address: "789 Crypto Blvd, Austin, TX 78701",
      description:
        "The premier blockchain and cryptocurrency conference featuring industry leaders, innovative projects, and networking opportunities. Don't miss this chance to connect with the crypto community.",
      attendees: 500,
      maxAttendees: 500,
      organizer: "Crypto Austin",
      category: "Blockchain",
      price: "$150",
      isJoined: true,
    },
  };

  return events[id as keyof typeof events] || events["1"];
};

export default function EventDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const event = getEventData(resolvedParams.id);

  return (
    <>
      <Page.Header className="p-0">
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 py-4 flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              ← Back
            </Link>
            <h1 className="text-lg font-semibold">Event Details</h1>
          </div>
        </div>
      </Page.Header>

      <Page.Main className="mb-16">
        {/* Event Image */}
        <div className="w-full h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-2xl font-bold mb-2">{event.name}</h1>
            <p className="text-lg opacity-90">{event.category}</p>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Event Info */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-gray-500">📅</span>
                <div>
                  <p className="font-medium">{event.date}</p>
                  <p className="text-sm text-gray-600">{event.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-500">📍</span>
                <div>
                  <p className="font-medium">{event.location}</p>
                  <p className="text-sm text-gray-600">{event.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-500">👥</span>
                <div>
                  <p className="font-medium">
                    {event.attendees} / {event.maxAttendees} attendees
                  </p>
                  <p className="text-sm text-gray-600">
                    Organized by {event.organizer}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-500">💰</span>
                <div>
                  <p className="font-medium">{event.price}</p>
                  <p className="text-sm text-gray-600">Event Price</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold mb-3">About This Event</h3>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          {/* People and My Circle Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* People Section */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-semibold mb-4">People</h3>
              <div className="space-y-3">
                {mockProfiles.map((profile) => (
                  <Link
                    key={profile.id}
                    href={`/profile/${profile.id}`}
                    className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-md transition-colors"
                  >
                    <img
                      src={profile.profilePicture}
                      alt={profile.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{profile.name}</p>
                      <p className="text-xs text-gray-500">
                        @{profile.username}
                      </p>
                    </div>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                      View Profile
                    </button>
                  </Link>
                ))}
              </div>
            </div>

            {/* My Circle Section */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-semibold mb-4">My Circle</h3>
              <div className="space-y-3">
                {mockProfiles
                  .filter((profile) => profile.isInMyCircle)
                  .map((profile) => (
                    <Link
                      key={profile.id}
                      href={`/profile/${profile.id}`}
                      className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-md transition-colors"
                    >
                      <img
                        src={profile.profilePicture}
                        alt={profile.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{profile.name}</p>
                        <p className="text-xs text-gray-500">
                          @{profile.username}
                        </p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        In Circle
                      </span>
                    </Link>
                  ))}
                {mockProfiles.filter((profile) => profile.isInMyCircle)
                  .length === 0 && (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No one from your circle is attending this event
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {event.isJoined ? (
              <button className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-md font-medium">
                You&apos;re Attending
              </button>
            ) : (
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Join Event
              </button>
            )}

            <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors">
              Share Event
            </button>
          </div>
        </div>
      </Page.Main>
    </>
  );
}
