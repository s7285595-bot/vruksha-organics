"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!showSplash) {
    return null;
  }

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splash-logo">
          V
        </div>

        <h1>VRUKSHA</h1>

        <p>ORGANICS</p>

        <span className="splash-line" />

        <small>PURE • NATURAL • ORGANIC</small>
      </div>
    </div>
  );
}