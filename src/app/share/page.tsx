"use client";

import { Page } from "@/components/PageLayout";
import { TopBar } from "@worldcoin/mini-apps-ui-kit-react";
import { useSearchParams } from "next/navigation.js";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const QrReader = dynamic(
  () => import("react-qr-reader").then((mod) => mod.QrReader), // <-- use named export
  { ssr: false }
);

export default function AddCircle() {
  const [showQR, setShowQR] = useState(false);
  const [receivedId, setReceivedId] = useState<string | null>(null);
  const [nfcSupported, setNfcSupported] = useState(false);
  const searchParams = useSearchParams();
  const worldId = searchParams.get("worldId");
  const worldAddress = searchParams.get("worldAddress");

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
          {/* Share Profile Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{worldAddress}</h2>
              <p className="text-gray-600 text-sm">
                Let others add you to their circle by scanning your QR code
              </p>
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
