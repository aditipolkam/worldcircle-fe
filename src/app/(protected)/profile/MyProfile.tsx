"use client";

import { Page } from "@/components/PageLayout";
import { useWorldTx } from "@/hooks/useWorldTx";
import { getPerson } from "@/lib/read";
import { Marble, TopBar } from "@worldcoin/mini-apps-ui-kit-react";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import SelfAuthButton from "@/components/SelfAuthButton";

interface ProfileData {
  name: string;
  gender: string;
  age: string;
  company: string;
  bio: string;
  profilePicture: string;
  location: string;
  eventsAttended: string[];
}

// Available events from home page
const availableEvents = [
  { id: 1, name: "Tech Meetup 2024", date: "2024-02-15" },
  { id: 2, name: "Design Workshop", date: "2024-02-20" },
  { id: 3, name: "Blockchain Conference", date: "2024-01-30" },
  { id: 4, name: "AI & Machine Learning Summit", date: "2024-03-10" },
  { id: 5, name: "Startup Pitch Night", date: "2024-02-25" },
  { id: 6, name: "Web3 Developer Meetup", date: "2024-03-05" },
  { id: 7, name: "UX Design Conference", date: "2024-03-15" },
  { id: 8, name: "Mobile App Development", date: "2024-02-28" },
];

export default function MyProfile({ session }: { session: Session }) {
  const { sendTx } = useWorldTx();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  // Initialize with default values
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    gender: "Male",
    age: "",
    company: "",
    bio: "",
    profilePicture: session.user.profilePictureUrl,
    location: "",
    eventsAttended: [],
  });

  // Load profile data on component mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Try to load from localStorage first
        // const savedProfile = localStorage.getItem("userProfile");
        const [_worldId, name, bio, location, company, _isSelfVerified] =
          await getPerson(session.user.walletAddress as `0x${string}`);

        setProfileData({ ...profileData, name, bio, company, location });
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    loadProfile();
  }, [profileData, session.user.walletAddress]);

  const handleSaveProfile = async () => {
    if (!session?.user.id) return;
    setIsSaving(true);
    setSaveStatus("saving");

    try {
      // Save to localStorage (in a real app, this would be an API call)
      localStorage.setItem("userProfile", JSON.stringify(profileData));

      registerPerson(
        session?.user.id,
        profileData.name,
        profileData.bio,
        profileData.company,
        profileData.location
      );

      setSaveStatus("saved");
      setIsEditing(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEventToggle = (eventName: string) => {
    setProfileData((prev) => {
      const isSelected = prev.eventsAttended.includes(eventName);
      if (isSelected) {
        return {
          ...prev,
          eventsAttended: prev.eventsAttended.filter(
            (event) => event !== eventName
          ),
        };
      } else {
        return {
          ...prev,
          eventsAttended: [...prev.eventsAttended, eventName],
        };
      }
    });
  };

  async function registerPerson(
    worldId: string,
    name: string,
    bio: string,
    company: string,
    location: string
  ) {
    console.log("sending txn");
    await sendTx("registerPerson", [worldId, name, bio, location, company]);
  }

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
              {isEditing ? "Cancel" : "Edit"}
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
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-center text-xl font-semibold"
                />
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="Location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-center text-sm text-gray-500"
                />
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  {profileData.name || "Your Name"}
                </h2>
                <p className="text-gray-500 text-sm">
                  {profileData.location || "Your Location"}
                </p>
              </div>
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
                      handleInputChange("gender", e.target.value)
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
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="Your age"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">
                    {profileData.age
                      ? `${profileData.age} years old`
                      : "Not specified"}
                  </p>
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
                      handleInputChange("company", e.target.value)
                    }
                    placeholder="Your company"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">
                    {profileData.company || "Not specified"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold mb-4">About</h3>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell us about yourself..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">
                {profileData.bio || "No bio added yet. Click Edit to add one!"}
              </p>
            )}
          </div>

          {/* Events Attended */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="font-semibold mb-4">Events Attended</h3>
            {isEditing ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Select events you&lsquo;ve attended:
                </p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {availableEvents.map((event) => (
                    <label
                      key={event.id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={profileData.eventsAttended.includes(
                          event.name
                        )}
                        onChange={() => handleEventToggle(event.name)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {event.name}
                        </p>
                        <p className="text-xs text-gray-500">{event.date}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {profileData.eventsAttended.length > 0 ? (
                  profileData.eventsAttended.map((event, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p className="text-gray-900 text-sm">{event}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No events selected yet. Click Edit to add some!
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Save Button */}
          {isEditing && (
            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Profile"}
            </button>
          )}

          {/* Status Messages */}
          {saveStatus === "saved" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-600 text-sm text-center">
                ✅ Profile saved successfully!
              </p>
            </div>
          )}

          {saveStatus === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm text-center">
                ❌ Failed to save profile. Please try again.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {!isEditing && (
            <div className="space-y-3">
              <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors">
                Share My Profile
              </button>
              <div className="w-full bg-white border border-gray-300 rounded-md p-3">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Verify Your Identity
                  </p>
                  <SelfAuthButton />
                </div>
              </div>
            </div>
          )}
        </div>
      </Page.Main>
    </>
  );
}
