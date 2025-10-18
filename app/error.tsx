'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-grow flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400">An unexpected error occurred. Please try again.</p>
      <button
        onClick={() => reset()}
        className="rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
      >
        Try again
      </button>
    </div>
  );
}
