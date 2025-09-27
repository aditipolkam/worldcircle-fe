import { Page } from '@/components/PageLayout';
import { TopBar, Marble } from '@worldcoin/mini-apps-ui-kit-react';
import { auth } from '@/auth';
import Link from 'next/link';

// Dummy event data
const yourEvents = [
  {
    id: 1,
    name: "Tech Meetup 2024",
    date: "2024-02-15",
    location: "San Francisco, CA",
    type: "upcoming"
  },
  {
    id: 2,
    name: "Design Workshop",
    date: "2024-02-20",
    location: "New York, NY",
    type: "upcoming"
  },
  {
    id: 3,
    name: "Blockchain Conference",
    date: "2024-01-30",
    location: "Austin, TX",
    type: "past"
  }
];

const exploreEvents = [
  {
    id: 4,
    name: "AI & Machine Learning Summit",
    date: "2024-03-10",
    location: "Seattle, WA"
  },
  {
    id: 5,
    name: "Startup Pitch Night",
    date: "2024-02-25",
    location: "Los Angeles, CA"
  },
  {
    id: 6,
    name: "Web3 Developer Meetup",
    date: "2024-03-05",
    location: "Miami, FL"
  },
  {
    id: 7,
    name: "UX Design Conference",
    date: "2024-03-15",
    location: "Chicago, IL"
  },
  {
    id: 8,
    name: "Mobile App Development",
    date: "2024-02-28",
    location: "Denver, CO"
  }
];

export default async function Home() {
  const session = await auth();

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
          <h2 className="text-xl font-semibold mb-4">Your Events</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {yourEvents.map((event) => (
              <Link key={event.id} href={`/event/${event.id}`} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm">{event.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    event.type === 'upcoming' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {event.type === 'upcoming' ? 'Upcoming' : 'Past'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">📅 {event.date}</p>
                <p className="text-gray-600 text-sm">📍 {event.location}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Explore Events Section */}
        <div className="px-4">
          <h2 className="text-xl font-semibold mb-4">Explore Events</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {exploreEvents.map((event) => (
              <Link key={event.id} href={`/event/${event.id}`} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold text-sm mb-2">{event.name}</h3>
                <p className="text-gray-600 text-sm mb-1">📅 {event.date}</p>
                <p className="text-gray-600 text-sm mb-3">📍 {event.location}</p>
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
