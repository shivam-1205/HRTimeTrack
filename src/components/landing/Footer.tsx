"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline bg-surface-container-lowest py-10 text-on-surface-variant">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 md:grid-cols-3">
        <div>
          <p className="text-xl font-semibold text-on-surface">Portal</p>
          <p className="mt-4 max-w-sm text-body-md">
            The modern HRMS platform for enterprise teams that need payroll automation, compliance
            coverage, and employee engagement.
          </p>
        </div>

        <div className="grid gap-3 text-body-md">
          <p className="font-semibold text-on-surface">Product</p>
          <Link className="transition hover:text-primary" href="/features">
            Features
          </Link>
          <Link className="transition hover:text-primary" href="/pricing">
            Pricing & Plans
          </Link>
          <Link className="transition hover:text-primary" href="/about-us">
            About
          </Link>
        </div>

        <div className="grid gap-3 text-body-md">
          <p className="font-semibold text-on-surface">Contact</p>
          <p>support@portalhrms.com</p>
          <p>+1 (555) 123-4567</p>
          <p>© 2026 by Shivam</p>
        </div>
      </div>
    </footer>
  );
}
