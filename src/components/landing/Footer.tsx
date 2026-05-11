"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border border-b-2 text-slate-200 py-6">
      <div className="max-w-[1440px] mx-auto px-6 grid gap-10 md:grid-cols-3">
        <div>
          <p className="text-xl font-semibold text-black">Portal</p>
          <p className="mt-4 text-sm text-black max-w-sm">
            The modern HRMS platform for enterprise teams that need payroll automation, compliance coverage, and employee engagement.
          </p>
        </div>

        <div className="grid gap-3 text-md text-slate-400">
          <p className="font-semibold text-black">Product</p>
          <Link className="hover:text-secondary transition" href="/features">Features</Link>
          <Link className="hover:text-secondary transition" href="/pricing">Pricing & Plans</Link>
          <Link className="hover:text-secondary transition" href="/about-us">About</Link>
        </div>

        <div className="grid gap-3 text-md text-slate-400">
          <p className="font-semibold text-black">Contact</p>
          <p>support@portalhrms.com</p>
          <p>+1 (555) 123-4567</p>
          <p>© 2026 by Shivam</p>
        </div>
      </div>
    </footer>
  );
}
