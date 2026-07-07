"use client";
import { useEffect, useRef } from "react";
import { useNavbar } from "@/context/NavbarContext";

const BannerObserver = ({ range = 0 }) => {
  const ref = useRef(null);
  const { setBannerActive } = useNavbar();

  useEffect(() => {
    let ticking = false;

    const update = () => {
      if (!ref.current) return;
      const { bottom } = ref.current.getBoundingClientRect();
      setBannerActive(bottom > range);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", update);
    };
  }, [setBannerActive, range]);
  
  return (
    <div ref={ref} className="banner" />
  )
}

export default BannerObserver