"use client";

import { clsx } from "clsx";

export default function ConnectedIndicator({
  connected,
  connectFunc,
  disconnectFunc,
}) {
  function toggleConnection() {
    if (connected) {
      disconnectFunc();
    } else {
      connectFunc();
    }
  }

  return (
    <div className="fixed left-28 top-5">
      <button
        type="button"
        onClick={toggleConnection}
        className={clsx(
          "flex h-10 w-32 items-center justify-center rounded-lg text-sm font-medium text-white transition-colors aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
          connected && "bg-green-500",
          !connected && "bg-red-500",
        )}
      >
        {connected ? "Connected" : "Disconnected"}
      </button>
    </div>
  );
}
