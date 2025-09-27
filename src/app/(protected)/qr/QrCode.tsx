"use client";

import { Page } from "@/components/PageLayout";
import { TopBar } from "@worldcoin/mini-apps-ui-kit-react";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QrCode({ worldId }: { worldId: string }) {
  const [receivedId, setReceivedId] = useState<string | null>(null);
  const [nfcSupported, setNfcSupported] = useState(false);

  useEffect(() => {
    if ("NDEFReader" in window) {
      setNfcSupported(true);
    }
  }, []);

  const writeNFC = async () => {
    if (!("NDEFReader" in window)) return;
    try {
      const ndef = new (window as any).NDEFReader();
      await ndef.write({ records: [{ recordType: "text", data: worldId }] });
      alert("WorldID sent via NFC!");
    } catch (err) {
      console.error("NFC write failed", err);
      alert("NFC write failed");
    }
  };

  const readNFC = async () => {
    if (!("NDEFReader" in window)) return;
    try {
      const ndef = new (window as any).NDEFReader();
      await ndef.scan();
      ndef.onreading = (event: any) => {
        for (const record of event.message.records) {
          if (record.recordType === "text") {
            const textDecoder = new TextDecoder(record.encoding || "utf-8");
            setReceivedId(textDecoder.decode(record.data));
          }
        }
      };
      alert("Ready to scan NFC!");
    } catch (err) {
      console.error("NFC scan failed", err);
      alert("NFC scan failed");
    }
  };

  return (
    <>
      <Page.Header className="p-0">
        <TopBar title="Add Circle" />
      </Page.Header>

      <Page.Main className="mb-16">
        <div className="px-4 py-6 space-y-6">
          {nfcSupported ? (
            <div className="space-y-2">
              <button
                onClick={writeNFC}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Send via NFC
              </button>
              <button
                onClick={readNFC}
                className="p-2 bg-green-500 text-white rounded"
              >
                Receive via NFC
              </button>
              {receivedId && <p>Received WorldID: {receivedId}</p>}
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-yellow-600 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">
                    NFC Not Supported
                  </h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Unfortunately, NFC is not supported on this device. Please
                    use a QR code to share your world profile.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Share Profile Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                Share Your World Profile
              </h2>
              <p className="text-gray-600 text-sm">
                Let others add you to their circle by scanning your QR code
              </p>
            </div>

            <div className="space-y-6">
              {/* Beautiful QR Code Display */}
              <div className="relative">
                {/* Outer glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-20 scale-110"></div>

                {/* Main QR container */}
                <div
                  className="relative bg-white rounded-3xl shadow-2xl p-8 mx-auto"
                  style={{ width: "280px", height: "280px" }}
                >
                  {/* Decorative border */}
                  <div className="absolute inset-2 border-2 border-gradient-to-r from-blue-500 to-purple-500 rounded-2xl"></div>

                  {/* QR Code */}
                  <QRCodeSVG
                    value={
                      process.env.NEXT_PUBLIC_AUTH_URL +
                      "/share?worldId=" +
                      worldId
                    }
                    size={200}
                  />

                  {/* Corner decorations */}
                  <div className="absolute top-4 left-4 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-60"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-60"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full opacity-60"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-60"></div>
                </div>
              </div>

              {/* Instructions with beautiful styling */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full border border-blue-200">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                  <span className="text-blue-800 font-semibold text-sm">
                    Scan to receive World ID
                  </span>
                </div>

                <p className="text-gray-600 text-sm max-w-xs mx-auto leading-relaxed">
                  Others can scan this code to add you to their circle and
                  connect with you
                </p>
              </div>

              {/* Beautiful Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    // TODO: Implement share functionality
                    navigator
                      .share?.({
                        title: "My World Profile",
                        text: "Add me to your circle!",
                        url: `worldid://profile/${worldId}`,
                      })
                      .catch(() => {
                        // Fallback: copy to clipboard
                        navigator.clipboard.writeText(
                          `worldid://profile/${worldId}`
                        );
                        alert("Profile link copied to clipboard!");
                      });
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                    Share Link
                  </div>
                </button>
              </div>
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
                  How it works
                </h3>
                <ul className="text-sm text-blue-700 mt-1 space-y-1">
                  <li>• Your QR code is unique and fixed to your profile</li>
                  <li>• Others scan it to add you to their circle</li>
                  <li>• You can share the link directly or show the QR code</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Page.Main>
    </>
  );
}
