import React from "react";

export function useStickyState(defaultValue: string, key: string) {
  if (!key)
    throw new Error("useStickyState must be initializated with a provided key");

  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
