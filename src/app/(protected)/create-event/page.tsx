"use client";

import { Page } from "@/components/PageLayout";
import { TopBar, Button, Input } from "@worldcoin/mini-apps-ui-kit-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Event } from "@/types/event";

export default function CreateEvent() {
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "failed"
  >("idle");

  const [formData, setFormData] = useState({
    name: "",
    about: "",
    date: "",
    venue: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.about ||
      !formData.date ||
      !formData.venue
    ) {
      alert("Please fill in all fields");
      return;
    }

    setStatus("pending");

    try {
      // Get existing events from localStorage
      const existingEvents = JSON.parse(localStorage.getItem("events") || "[]");

      // Create new event
      const newEvent: Event = {
        id: Date.now().toString(),
        name: formData.name,
        about: formData.about,
        date: formData.date,
        venue: formData.venue,
        creator: "current-user", // In a real app, this would be the user's address
        createdAt: new Date().toISOString(),
      };

      // Add to existing events
      const updatedEvents = [...existingEvents, newEvent];

      // Save back to localStorage
      localStorage.setItem("events", JSON.stringify(updatedEvents));

      // Simulate network delay for better UX
      setTimeout(() => {
        setStatus("success");
      }, 1000);
    } catch (error) {
      console.error("Error creating event:", error);
      setStatus("failed");
    }
  };

  // Reset form and redirect on success
  if (status === "success") {
    setTimeout(() => {
      setFormData({ name: "", about: "", date: "", venue: "" });
      router.push("/home");
    }, 2000);
  }

  return (
    <>
      <Page.Header className="p-0">
        <TopBar title="Create Event" />
      </Page.Header>

      <Page.Main className="p-4 mb-16">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Event Name *
            </label>
            <Input
              type="text"
              label="Event Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              disabled={status === "pending"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">About *</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="Describe your event"
              value={formData.about}
              onChange={(e) => handleInputChange("about", e.target.value)}
              disabled={status === "pending"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Date *</label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              disabled={status === "pending"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Venue *</label>
            <Input
              label="Enter venue location"
              value={formData.venue}
              onChange={(e) => handleInputChange("venue", e.target.value)}
              disabled={status === "pending"}
            />
          </div>

          <div className="pt-4">
            {status === "idle" && (
              <Button type="submit" className="w-full" variant="primary">
                Create Event
              </Button>
            )}

            {status === "pending" && (
              <Button className="w-full" variant="primary" disabled>
                Creating Event...
              </Button>
            )}

            {status === "success" && (
              <div className="text-center">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  ✅ Event created successfully!
                </div>
                <p className="text-sm text-gray-600">Redirecting to home...</p>
              </div>
            )}

            {status === "failed" && (
              <div className="space-y-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  ❌ Failed to create event. Please try again.
                </div>
                <Button type="submit" className="w-full" variant="primary">
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </form>
      </Page.Main>
    </>
  );
}
