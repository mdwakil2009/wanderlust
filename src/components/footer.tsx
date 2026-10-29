"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { playfair } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Profile", href: "/profile" },
] as const;

const SUPPORT_LINKS = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
] as const;

function XIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M3 4.5A1.5 1.5 0 0 1 4.5 3h15A1.5 1.5 0 0 1 21 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-15ZM8.7 8.3a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Zm-2 2.7h1.8v6.7H6.7V11Zm3.6 0h1.7v.9h.03c.25-.5.9-1.05 1.95-1.05 2.1 0 2.5 1.38 2.5 3.18v3.67h-1.8v-3.25c0-.77-.02-1.77-1.08-1.77-1.08 0-1.25.84-1.25 1.71v3.31h-1.8V11Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function InstagramIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <footer className="bg-[#0c0b0b] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14">
        {/* Top brand header */}
        <div className="pt-16 pb-12 sm:pt-20 sm:pb-14">
          <Link
            href="/"
            className={cn(
              playfair.className,
              "inline-block text-4xl font-bold tracking-tight text-white transition-opacity hover:opacity-90 sm:text-5xl md:text-[54px]"
            )}
          >
            Wanderlust
          </Link>
          <p className="mt-3.5 text-sm text-gray-400 sm:text-[15px]">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        {/* 4-Column navigation & info grid */}
        <div className="grid grid-cols-1 gap-10 pb-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Column 1: Newsletter */}
          <div>
            <h3 className="text-xs font-medium tracking-wider text-white uppercase sm:text-[13px]">
              NEWSLETTER
            </h3>
            <p className="mt-2.5 text-xs leading-relaxed text-gray-400 sm:text-[13px]">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="relative flex w-full max-w-xs items-center">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  aria-label="Email address for newsletter"
                  required
                  className="h-10 w-full rounded-none border-transparent bg-[#373737] px-3.5 pr-10 text-xs text-white placeholder:text-gray-400 transition-colors focus-visible:border-gray-500 focus-visible:ring-0 sm:text-sm"
                />
                <Button
                  type="submit"
                  size="icon-sm"
                  variant="ghost"
                  aria-label="Submit newsletter subscription"
                  className="absolute top-1 right-1 bottom-1 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {isSubmitted ? (
                    <Check className="size-4 text-emerald-400" aria-hidden="true" />
                  ) : (
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  )}
                </Button>
              </div>
              {isSubmitted && (
                <p className="mt-2 text-xs text-emerald-400">
                  Thank you for subscribing!
                </p>
              )}
            </form>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xs font-medium tracking-wider text-white uppercase sm:text-[13px]">
              QUICK LINKS
            </h3>
            <ul className="mt-3.5 space-y-2.5 text-xs sm:text-[13px]">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-xs font-medium tracking-wider text-white uppercase sm:text-[13px]">
              SUPPORT
            </h3>
            <ul className="mt-3.5 space-y-2.5 text-xs sm:text-[13px]">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-xs font-medium tracking-wider text-white uppercase sm:text-[13px]">
              CONTACT US
            </h3>
            <ul className="mt-3.5 space-y-2.5 text-xs sm:text-[13px]">
              <li>
                <a
                  href="tel:7869011622"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wanderlust.com"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  info@wanderlust.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & social icons bar */}
        <Separator className="bg-white/10" />
        <div className="py-6 sm:py-7">
          <div className="flex flex-col gap-4 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Wanderlust. All rights reserved.</p>
            <div className="flex items-center gap-5 text-white">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="text-gray-300 transition-colors hover:text-white"
              >
                <XIcon className="size-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-300 transition-colors hover:text-white"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-300 transition-colors hover:text-white"
              >
                <InstagramIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
