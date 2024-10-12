export const setItem = (key: string, item: any): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(item));
  } catch (err) {
    console.error('local storage setItem error:', err);
  }
};

export const getItem = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch (err) {
    console.error('local storage getItem error:', err);
    return null;
  }
};
