export const isFirebaseIndexError = (error: string): boolean => {
  return (
    error.includes('The query requires an index') &&
    error.includes('https://console.firebase.google.com')
  );
};

export const extractIndexLink = (errorMessage: string): string | null => {
  const match = errorMessage.match(
    /https:\/\/console\.firebase\.google\.com[^\s]+/
  );
  return match ? match[0] : null;
};
