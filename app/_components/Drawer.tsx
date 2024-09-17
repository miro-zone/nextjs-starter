"use client";

import { useEffect, useRef } from "react";
import { useClickOut } from "../_hooks/click-out";

export default function Drawer() {
  const elRef = useRef(null);
  const [open, setOpen] = useClickOut(elRef);

  const toggleDrawer = () => {
    setOpen((cur) => !cur);
  };

  useEffect(() => {
    document.body.style.overflowY = open ? "hidden" : "auto";
  }, [open]);

  return (
    <div ref={elRef}>
      <button onClick={toggleDrawer}>Menu</button>
      <aside
        className={`
      absolute top-0 w-72 bg-white dark:bg-black h-screen overflow-hidden ${
        open ? "left-0" : "-left-full"
      } transition-[left] divide-y shadow dark:ring-2  dark:ring-gray-400 rounded-r-lg flex flex-col justify-between`}
      >
        <header className="p-3 dar:bg-slate-800 bg-slate-200">
          <h2 className="text-center">Company Name</h2>
        </header>
        <nav className="flex-grow p-4">
          <ul>
            <li>LinkOne</li>
          </ul>
        </nav>

        <section className="p-4">
          Login
        </section>
      </aside>
    </div>
  );
}
