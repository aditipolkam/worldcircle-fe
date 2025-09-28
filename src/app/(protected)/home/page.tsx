"use client";

import { Page } from "@/components/PageLayout";
import { TopBar, Marble } from "@worldcoin/mini-apps-ui-kit-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Event } from "@/types/event";

// Dummy explore events (keeping these for demo)
const exploreEvents = [
  {
    id: 4,
    name: "AI & Machine Learning Summit",
    date: "2024-03-10",
    location: "Seattle, WA",
  },
  {
    id: 5,
    name: "Startup Pitch Night",
    date: "2024-02-25",
    location: "Los Angeles, CA",
  },
  {
    id: 6,
    name: "Web3 Developer Meetup",
    date: "2024-03-05",
    location: "Miami, FL",
  },
  {
    id: 7,
    name: "UX Design Conference",
    date: "2024-03-15",
    location: "Chicago, IL",
  },
  {
    id: 8,
    name: "Mobile App Development",
    date: "2024-02-28",
    location: "Denver, CO",
  },
];

export default function Home() {
  const { data: session } = useSession();
  const [yourEvents, setYourEvents] = useState<Event[]>([]);

  const loadEvents = () => {
    // Load events from localStorage
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      try {
        const events = JSON.parse(storedEvents);
        setYourEvents(events);
      } catch (error) {
        console.error("Error parsing events from localStorage:", error);
        setYourEvents([]);
      }
    } else {
      setYourEvents([]);
    }
  };

  useEffect(() => {
    loadEvents();

    // Refresh events when the page becomes visible again
    const handleFocus = () => {
      loadEvents();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <>
      <Page.Header className="p-0">
        <TopBar
          title="Home"
          endAdornment={
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold capitalize">
                {session?.user.username}
              </p>
              <Marble src={session?.user.profilePictureUrl} className="w-12" />
            </div>
          }
        />
      </Page.Header>
      <Page.Main className="flex flex-col gap-6 mb-16">
        {/* Your Events Section */}
        <div className="px-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Events</h2>
            <Link
              href="/create-event"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              + Create Event
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {yourEvents.length === 0 ? (
              <div className="w-full text-center py-8 text-gray-500">
                <p>No events created yet</p>
                <p className="text-sm">
                  Click &quot;Create Event&quot; to get started!
                </p>
              </div>
            ) : (
              yourEvents.map((event) => {
                // Determine if event is upcoming or past
                const eventDate = new Date(event.date);
                const today = new Date();
                const isUpcoming = eventDate >= today;

                return (
                  <Link
                    key={event.id}
                    href={`/event/${event.id}`}
                    className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-sm">{event.name}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          isUpcoming
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {isUpcoming ? "Upcoming" : "Past"}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">
                      📅 {event.date}
                    </p>
                    <p className="text-gray-600 text-sm mb-1">
                      📍 {event.venue}
                    </p>
                    <p className="text-gray-600 text-xs truncate">
                      {event.about}
                    </p>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {/* Explore Events Section */}
        <div className="px-4">
          <h2 className="text-xl font-semibold mb-4">Explore Events</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {exploreEvents.map((event) => (
              <Link
                key={event.id}
                href={`/event/${event.id}`}
                className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <h3 className="font-semibold text-sm mb-2">{event.name}</h3>
                <p className="text-gray-600 text-sm mb-1">📅 {event.date}</p>
                <p className="text-gray-600 text-sm mb-3">
                  📍 {event.location}
                </p>
                <div className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700 transition-colors text-center">
                  View Event
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Page.Main>
    </>
  );
}
