"use client";

import { getUniversalLink } from "@selfxyz/core";
import { countries, SelfApp, SelfAppBuilder } from "@selfxyz/qrcode";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SelfAuthButton() {
  const [selfApp, setSelfApp] = useState<SelfApp | null>(null);
  const [universalLink, setUniversalLink] = useState("");
  const session = useSession();
  const userId = session?.data?.user?.id;
  useEffect(() => {
    if (!userId) {
      return;
    }
    console.log("Wallet Address: ", session.data?.user);
    console.log(userId);
    const app = new SelfAppBuilder({
      version: 2,
      appName: "Self Docs",
      scope: "self-docs",
      endpoint: "https://recently-moral-anemone.ngrok-free.app/api/verify",
      logoBase64: "https://i.postimg.cc/mrmVf9hm/self.png",
      userId,
      endpointType: "staging_https",
      userIdType: "hex",
      deeplinkCallback: `worldapp://mini-app?app_id=${
        process.env.NEXT_PUBLIC_APP_ID
      }&path=${encodeURI("/home")}`,
      userDefinedData: "Verifying Identity with zkproof and self.xyz!",
      disclosures: {
        // What you want to verify from the user's identity
        minimumAge: 18,
        name: true,
        excludedCountries: [
          countries.CUBA,
          countries.IRAN,
          countries.NORTH_KOREA,
          countries.RUSSIA,
        ],

        // What you want users to
        nationality: true,
        gender: true,
        issuing_state: true,
        date_of_birth: true,
        expiry_date: true,
        ofac: true,
        passport_number: true,
      },
    }).build();

    setSelfApp(app);
    setUniversalLink(getUniversalLink(app));
  }, [session.data?.user, userId]);

  const openSelfApp = () => {
    if (!universalLink) return;
    window.open(universalLink, "_blank");
  };

  return (
    <div>
      {selfApp ? (
        <button type="button" onClick={openSelfApp} disabled={!universalLink}>
          Open Self App
        </button>
      ) : (
        <div>
          <p>Loading Self...</p>
        </div>
      )}
    </div>
  );
}
