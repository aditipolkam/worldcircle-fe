"use client";

import { WorldCircle, client } from "@/lib/contract";
import { MiniKit } from "@worldcoin/minikit-js";
import { useWaitForTransactionReceipt } from "@worldcoin/minikit-react";
import { useEffect, useState } from "react";

export function useWorldTx() {
  const [txId, setTxId] = useState<string>("");
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "failed"
  >("idle");

  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    client,
    appConfig: {
      app_id: process.env.NEXT_PUBLIC_WLD_CLIENT_ID as `app_${string}`,
    },
    transactionId: txId,
  });

  useEffect(() => {
    if (!txId) return;
    if (isSuccess) setStatus("success");
    else if (isError) setStatus("failed");
    else if (isLoading) setStatus("pending");
  }, [isLoading, isSuccess, isError, txId]);

  async function sendTx(fn: string, args: any[] = []) {
    setStatus("pending");
    try {
      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: WorldCircle.address,
            abi: WorldCircle.abi,
            functionName: fn,
            args,
          },
        ],
      });

      if (finalPayload.status === "success") {
        setTxId(finalPayload.transaction_id);
      } else {
        setStatus("failed");
      }
    } catch (err) {
      console.error(err);
      setStatus("failed");
    }
  }

  return { sendTx, status };
}
