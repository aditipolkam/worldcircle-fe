"use client";

import { Page } from "@/components/PageLayout";
import { useWorldTx } from "@/hooks/useWorldTx";
import { TopBar, Marble } from "@worldcoin/mini-apps-ui-kit-react";
import { useEffect, useState } from "react";

// Mock existing events data
const existingEvents = [
  { id: "1", name: "Tech Meetup 2024", date: "2024-02-15" },
  { id: "2", name: "Design Workshop", date: "2024-02-20" },
  { id: "3", name: "Blockchain Conference", date: "2024-01-30" },
  { id: "4", name: "AI & Machine Learning Summit", date: "2024-03-10" },
  { id: "5", name: "Startup Pitch Night", date: "2024-02-25" },
];

export default function Profile() {
  const { sendTx, status } = useWorldTx();
  const [isEditing, setIsEditing] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    gender: "Male",
    age: "28",
    company: "Tech Corp",
    bio: "Passionate developer and tech enthusiast. Love connecting with like-minded people at events!",
    profilePicture:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    eventsAttended: ["1", "2", "3"],
  });

  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    location: "",
  });

  const handleSaveProfile = () => {
    // TODO: Save to API
    setIsEditing(false);
  };

  const handleAddEvent = () => {
    // TODO: Add new event to API
    setShowEventForm(false);
    setNewEvent({ name: "", date: "", location: "" });
  };

  const handleEventSelect = (eventId: string) => {
    const currentEvents = profileData.eventsAttended;
    if (currentEvents.includes(eventId)) {
      setProfileData({
        ...profileData,
        eventsAttended: currentEvents.filter((id) => id !== eventId),
      });
    } else {
      setProfileData({
        ...profileData,
        eventsAttended: [...currentEvents, eventId],
      });
    }
  };

  useEffect(() => {
    async function registerPerson(
      worldId: number,
      name: string,
      bio: string,
      company: string
    ) {
      console.log("sending txn");
      await sendTx("registerPerson", [worldId, name, bio, company]);
    }
    registerPerson(7, "aefef", "developer", "offline");
  }, []);

  return (
    <>
      <Page.Header className="p-0">
        <TopBar
          title="My Profile"
          endAdornment={
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-600 font-medium text-sm"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          }
        />
      </Page.Header>

      <Page.Main className="mb-16">
        <div className="px-4 py-6 space-y-6">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="flex justify-center mb-4">
              <Marble src={profileData.profilePicture} className="w-24 h-24" />
            </div>
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-center font-semibold"
                />
                <input
                  type="url"
                  value={profileData.profilePicture}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      profilePicture: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Profile picture URL"
                />
              </div>
            ) : (
              <h2 className="text-xl font-semibold mb-1">{profileData.name}</h2>
            )}
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold mb-4">Personal Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                {isEditing ? (
                  <select
                    value={profileData.gender}
                    onChange={(e) =>
                      setProfileData({ ...profileData, gender: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{profileData.gender}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profileData.age}
                    onChange={(e) =>
                      setProfileData({ ...profileData, age: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.age} years old</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.company}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        company: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.company}</p>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold mb-4">Bio</h3>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
            )}
          </div>

          {/* Events Attended */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Events Attended</h3>
              {isEditing && (
                <button
                  onClick={() => setShowEventForm(!showEventForm)}
                  className="text-blue-600 text-sm font-medium"
                >
                  {showEventForm ? "Cancel" : "Add New Event"}
                </button>
              )}
            </div>

            {/* Add New Event Form */}
            {showEventForm && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">Add New Event</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Event Name"
                    value={newEvent.name}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={newEvent.location}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, location: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={handleAddEvent}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
                  >
                    Add Event
                  </button>
                </div>
              </div>
            )}

            {/* Events List */}
            <div className="space-y-2">
              {existingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-3">
                  {isEditing && (
                    <input
                      type="checkbox"
                      checked={profileData.eventsAttended.includes(event.id)}
                      onChange={() => handleEventSelect(event.id)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{event.name}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                  {!isEditing &&
                    profileData.eventsAttended.includes(event.id) && (
                      <span className="text-green-600 text-sm">✓ Attended</span>
                    )}
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <button
              onClick={handleSaveProfile}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          )}
        </div>
      </Page.Main>
    </>
  );
}
