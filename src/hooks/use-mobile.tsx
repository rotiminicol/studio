'use client';

import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      return window.innerWidth < MOBILE_BREAKPOINT;
    };

    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    // Set the initial value after the component mounts
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // The empty dependency array ensures this effect runs only on the client, after hydration.

  return isMobile;
}
