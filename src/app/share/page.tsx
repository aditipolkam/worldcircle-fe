"use client";

import { Page } from "@/components/PageLayout";
import { TopBar } from "@worldcoin/mini-apps-ui-kit-react";
import { useSearchParams } from "next/navigation.js";
import { useState } from "react";

export default function AddCircle() {
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const searchParams = useSearchParams();
  
  // Get parameters from URL - try multiple possible parameter names
  const worldId = searchParams.get("worldId") || searchParams.get("id") || searchParams.get("userId");
  const worldAddress = searchParams.get("worldAddress") || searchParams.get("address") || searchParams.get("userAddress");
  
  // Debug: Log all URL parameters
  console.log("All URL parameters:", Object.fromEntries(searchParams.entries()));
  console.log("Extracted worldId:", worldId);
  console.log("Extracted worldAddress:", worldAddress);

  // Dummy smart contract call function
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate smart contract call
      console.log("Calling smart contract with:", {
        worldId,
        worldAddress,
        notes,
        action: "addConnection",
      });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success
      setSubmitStatus("success");

      // Clear form after success
      setTimeout(() => {
        setNotes("");
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Smart contract call failed:", error);
      setSubmitStatus("error");

      // Reset error status after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!worldId) {
    return <></>;
  }

  return (
    <>
      <Page.Header className="p-0">
        <TopBar title="Add Circle" />
      </Page.Header>

      <Page.Main className="mb-16">
        <div className="px-4 py-6 space-y-6">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              Successfully Connected!
            </h2>
              <p className="text-green-700 text-sm">
                You're successfully connected with World ID:{" "}
                <span className="font-mono font-semibold">{worldId || "Unknown"}</span>
              </p>
            <p className="text-green-600 text-xs mt-2">
              Address: {worldAddress || "Not provided"}
            </p>
          </div>

          {/* Notes Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Add Notes</h3>
            <p className="text-gray-600 text-sm mb-4">
              Add some notes about this connection for future reference
            </p>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your notes here... (e.g., 'Met at Tech Meetup 2024', 'Great developer, interested in Web3', etc.)"
              className="w-full px-3 py-3 border border-gray-300 rounded-md resize-none"
              rows={4}
            />

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {notes.length} characters
              </span>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !notes.trim()}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  isSubmitting || !notes.trim()
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Connection"}
              </button>
            </div>
          </div>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-green-600 text-sm">
                  ✅ Connection successfully added to blockchain! Notes saved.
                </p>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <p className="text-red-600 text-sm">
                  ❌ Failed to add connection. Please try again.
                </p>
              </div>
            </div>
          )}

          {/* Debug Info - Remove this in production */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-800 mb-2">Debug Info</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p>World ID: {worldId || "Not found"}</p>
              <p>Address: {worldAddress || "Not found"}</p>
              <p>All URL params: {JSON.stringify(Object.fromEntries(searchParams.entries()))}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 text-blue-600 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-800">
                  Connection Details
                </h3>
                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                  <li>• This connection is stored on the blockchain</li>
                  <li>• Your notes are saved locally for your reference</li>
                  <li>• You can view this connection in your profile</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Page.Main>
    </>
  );
}
