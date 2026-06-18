"use client";

import { useEffect } from "react";

export default function RouteLogger() {
  useEffect(() => {
    console.log("App Mounted");

    return () => {
      console.log("App Unmounted");
    };
  }, []);

  return null;
}