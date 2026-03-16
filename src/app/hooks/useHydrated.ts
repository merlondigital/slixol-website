"use client";

import { useState, useEffect } from "react";

let hydrated = false;

export function useHydrated() {
  const [isHydrated, setIsHydrated] = useState(hydrated);

  useEffect(() => {
    hydrated = true;
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
