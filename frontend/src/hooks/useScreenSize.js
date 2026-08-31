import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export default function useScreenSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isPhone: width < MOBILE_BREAKPOINT,
    isTablet:
      width >= MOBILE_BREAKPOINT &&
      width < TABLET_BREAKPOINT,
    isDesktop: width >= TABLET_BREAKPOINT,
  };
}