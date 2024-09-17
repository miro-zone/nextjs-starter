"use client";

import { useEffect, useRef, useState } from "react";
import { useIntersect } from "../_hooks/intersect";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import Drawer from "./Drawer";

export const Header = () => {
  const topRef = useRef(null);

  const [topIntersecting] = useIntersect(topRef, 300);
  const [showHeader, setShowHeader] = useState(true);

  // Track scroll direction
  useEffect(() => {
    let last: number = 0,
      prev: number = 0,
      toTop: boolean = false;

    const PIVOT = 100;

    const handler = () => {
      const { scrollY } = window;
      // Check direction.
      if (
        (scrollY > prev  && toTop && scrollY > last+PIVOT) ||
        (scrollY < prev && !toTop && scrollY < last - PIVOT )
      ) {
        last = scrollY;
        toTop = !toTop;
        setShowHeader(toTop);
      }
      // Update prev value.
      prev = scrollY;
    };

    // Attach event.
    window.addEventListener("scroll", handler);
    // Cleanup.
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <div ref={topRef} id="top" />
      <header className={`flex justify-between items-center px-4 bg-white dark:bg-black w-full h-12 sm:h-14 fixed ${showHeader ? 'top-0':'-top-20'}`}>
        <section>Logo {showHeader ? 'show': 'not show'}</section>
        {/* Navigation section */}
        <nav className="hidden sm:block">
          <ul className="flex gap-4">
            <li>Link One</li>
            <li>Link Two</li>
          </ul>
        </nav>
        {/* Auth section */}
        <section className="hidden sm:block">login</section>
        {/* Drawer section */}
        <section className="sm:hidden">
          <Drawer />
        </section>
      </header>
      <a
        href="#top"
        className={`fixed bottom-5 p-1 right-5 bg-white opacity-50 dark:bg-black rounded-full animate-[spin_1s] hover:animate-bounce ${
          topIntersecting ? "hidden" : ""
        }`}
      >
        <ChevronDoubleUpIcon className="w-8 h-8" />
      </a>
    </>
  );
};
