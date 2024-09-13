"use client";

import { useNavigation } from "../_hooks/navigation";

export default function Header() {
  const { header, sidebar, top } = useNavigation();
  return (
    <>
      <div id="top" />
      <header className="absolute top-0 h-12 w-full bg-white/30 flex items-center justify-between p-2 shadow">
        <span>Logo</span>

        <nav className="sm:block hidden">
          <ul className="flex gap-4">
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </nav>

        <figure className="sm:block hidden">Avatar</figure>

        <button className="sm:hidden">Menu</button>
      </header>

      <aside className={`absolute -left-full top-0 h-screen w-72 bg-white`}>bla</aside>
    </>
  );
}
