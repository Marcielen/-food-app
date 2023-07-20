import { useState, useEffect } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const updateMatches = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQuery.addListener(updateMatches);

    setMatches(mediaQuery.matches);

    return () => {
      mediaQuery.removeListener(updateMatches);
    };
  }, [query]);

  return matches;
}
