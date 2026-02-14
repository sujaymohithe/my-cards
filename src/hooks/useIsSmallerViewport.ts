import { useState, useEffect } from "react";

/**
 * Hook to determine if the viewport is smaller than the given breakpoint.
 *
 * Default breakpoint (780px) matches the custom `sm` breakpoint
 * defined in the global CSS configuration.
 *
 * This ensures JS-driven responsive logic stays aligned with
 * CSS responsive behavior.
 */
export const useIsSmallerViewport = (breakpoint = 780) => {
  const [isSmallerViewport, setIsSmallerViewport] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    /**
     * Handle resize event to set the smaller view
     */
    const handleResize = () => {
      setIsSmallerViewport(window.innerWidth < breakpoint);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isSmallerViewport;
};
