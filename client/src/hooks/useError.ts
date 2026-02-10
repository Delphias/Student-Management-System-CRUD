import { useState } from "react";

export const useError = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = (
    err: unknown,
    fallbackMessage = "Something went wrong",
  ) => {
    let message = fallbackMessage;

    // User is offline
    if (!navigator.onLine) {
      message = "You are offline. Please check your internet connection.";
      // Network/server not reachable
    } else if (err instanceof TypeError && err.message === "Failed to fetch") {
      message = "Cannot connect to the server. Please try again later.";
      // Backend sent an error
    } else if (err instanceof Error) {
      message = err.message;
    }

    setError(message);
    console.error("Error handled:", err);
  };

  const clearError = () => setError(null);

  return { error, setError: handleError, clearError };
};
