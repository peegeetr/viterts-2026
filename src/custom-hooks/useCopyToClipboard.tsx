import { useState, useCallback } from "react";

export function useClipboard() {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = useCallback(
    async (text: string): Promise<boolean> => {
      if (!navigator.clipboard) {
        console.warn("Clipboard API is not supported in this browser.");
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);

        // Reset the copied state after 2 seconds
        setTimeout(() => setIsCopied(false), 2000);
        return true;
      } catch (error) {
        console.error("Failed to copy text: ", error);
        setIsCopied(false);
        return false;
      }
    },
    [],
  );

  return { isCopied, copyToClipboard };
}
