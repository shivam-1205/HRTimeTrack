// components/landing/navbar/Navbar.tsx
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
    const loggedIn = typeof window !== "undefined" && localStorage.getItem("portalLoggedIn") === "true";
    router.push(loggedIn ? "/pricing" : "/login");
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-outline-variant shadow-sm h-16 px-6 flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold text-[#4F46E5]">Portal</span>

        <nav className="hidden md:flex gap-6 ml-6">
          <Link
            href="/"
            className={`py-4 transition-colors ${
              isActive("/")
                ? "text-[#4F46E5] font-bold border-b-2 border-[#4F46E5]"
                : "text-on-surface-variant hover:text-[#4F46E5]"
            }`}
          >
            Home
          </Link>

          <Link
            href="#features"
            className={`py-4 transition-colors ${
              isActive("#features")
                ? "text-[#4F46E5] font-bold border-b-2 border-[#4F46E5]"
                : "text-on-surface-variant hover:text-[#4F46E5]"
            }`}
          >
            Features
          </Link>

          <Link
            href="/pricing"
            className={`py-4 transition-colors ${
              isActive("/pricing")
                ? "text-[#4F46E5] font-bold border-b-2 border-[#4F46E5]"
                : "text-on-surface-variant hover:text-[#4F46E5]"
            }`}
          >
            Pricing
          </Link>

          <Link
            href="/about-us"
            className={`py-4 transition-colors ${
              isActive("/about-us")
                ? "text-[#4F46E5] font-bold border-b-2 border-[#4F46E5]"
                : "text-on-surface-variant hover:text-[#4F46E5]"
            }`}
          >
            About
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {isSearchOpen ? (
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-outline-variant rounded-full focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all text-black"
            autoFocus
            onBlur={() => setIsSearchOpen(false)}
          />
        ) : (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hover:text-[#4F46E5] transition-colors p-2 rounded-full hover:bg-surface-container-high"
          >
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
          onClick={handleGetStarted}
          className="hidden md:flex items-center justify-center px-6 py-2 bg-[#4F46E5] text-white rounded-full shadow-sm hover:opacity-90 transition-opacity"
        >
          Get Started
        </button>
      </div>
    </header>
  );
}