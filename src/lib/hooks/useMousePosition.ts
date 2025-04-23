"use client";

import { useState, useEffect } from "react";

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Throttle the mouse move event to improve performance
    let timeoutId: NodeJS.Timeout | null = null;
    const throttledUpdateMousePosition = (e: MouseEvent) => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          updateMousePosition(e);
          timeoutId = null;
        }, 16); // ~60fps
      }
    };

    window.addEventListener("mousemove", throttledUpdateMousePosition);

    return () => {
      window.removeEventListener("mousemove", throttledUpdateMousePosition);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return mousePosition;
}
