"use client";
import { walletAuth } from "@/auth/wallet";
import { Button, LiveFeedback } from "@worldcoin/mini-apps-ui-kit-react";
import { useMiniKit } from "@worldcoin/minikit-js/minikit-provider";
import { signOut, useSession } from "next-auth/react";
import { useCallback, useState } from "react";

/**
 * This component is an example of how to authenticate a user
 * We will use Next Auth for this example, but you can use any auth provider
 * Read More: https://docs.world.org/mini-apps/commands/wallet-auth
 */
export const AuthButton = () => {
  const [isPending, setIsPending] = useState(false);
  const { isInstalled } = useMiniKit();
  const { data: session, status } = useSession();

  const onClick = useCallback(async () => {
    if (!isInstalled || isPending) {
      return;
    }
    setIsPending(true);
    try {
      await walletAuth();
    } catch (error) {
      console.error("Wallet authentication button error", error);
      setIsPending(false);
      return;
    }

    setIsPending(false);
  }, [isInstalled, isPending]);

  // Show loading state while session is being loaded
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center">
        <div>Loading session...</div>
      </div>
    );
  }

  // If user is authenticated, show welcome message instead of login button
  if (session?.user) {
    return (
      <div className="text-center space-y-4">
        <div className="text-lg font-semibold">Welcome back!</div>
        <div className="text-sm text-gray-600">
          Wallet: {session.user.walletAddress}
        </div>
        <div className="text-sm text-gray-600">
          Username: {session.user.username}
        </div>
        <Button
          onClick={() => {
            signOut();
          }}
          size="lg"
          variant="secondary"
        >
          Sign Out
        </Button>
      </div>
    );
  }

  // Show login button for unauthenticated users
  return (
    <>
      <LiveFeedback
        label={{
          failed: "Failed to login",
          pending: "Logging in",
          success: "Logged in",
        }}
        state={isPending ? "pending" : undefined}
      >
        <Button
          onClick={onClick}
          disabled={isPending}
          size="lg"
          variant="primary"
        >
          Login with Wallet
        </Button>
      </LiveFeedback>
      {/* Remove debug session display in production */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-4 text-xs text-gray-500">
          Session Status: {status}
        </div>
      )}
    </>
  );
};
