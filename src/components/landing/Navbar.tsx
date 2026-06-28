"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleGetStarted = () => {
    const loggedIn =
      typeof window !== "undefined" && localStorage.getItem("portalLoggedIn") === "true";
    router.push(loggedIn ? "/pricing" : "/login");
  };

  const linkClass = (href: string) =>
    `py-4 transition-colors ${
      isActive(href)
        ? "border-b-2 border-primary font-bold text-primary"
        : "text-on-surface-variant hover:text-primary"
    }`;

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-outline bg-surface-container-lowest px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold text-primary">Shivam</span>

        <nav className="ml-6 hidden gap-6 md:flex">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/features" className={linkClass("/features")}>
            Features
          </Link>
          <Link href="/pricing" className={linkClass("/pricing")}>
            Pricing
          </Link>
          <Link href="/about-us" className={linkClass("/about-us")}>
            About
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {isSearchOpen ? (
          <input
            type="text"
            placeholder="Search..."
            className="rounded-full border border-outline-variant px-4 py-2 text-on-surface transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            autoFocus
            onBlur={() => setIsSearchOpen(false)}
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="rounded-full p-2 transition-colors hover:bg-surface-container-high hover:text-primary"
            aria-label="Search"
          >
            <svg
              className="h-5 w-5 text-on-surface-variant"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        )}

        <button
          type="button"
          onClick={handleGetStarted}
          className="hidden items-center justify-center rounded-full bg-primary px-6 py-2 text-on-primary shadow-sm transition-opacity hover:opacity-90 md:flex"
        >
          Get Started
        </button>
      </div>
    </header>
  );
}
