"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

const navLinks = [
  { href: "/", label: "Home", active: true },
  { href: "/destinations", label: "Destinations", active: false },
  { href: "/add-destination", label: "Add Destination", active: false },
  { href: "/my-bookings", label: "My Bookings", active: false },
];

export function Navbar() {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const handleSignout = () => {
    authClient.signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left: primary links */}
        <ul className="flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-[#00A8E8]",
                  link.active
                    ? "border-b-2 border-[#00A8E8] pb-0.5 font-medium text-[#00A8E8]"
                    : "text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Center: logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold tracking-tight text-[#00A8E8]"
        >
          Wanderlast
        </Link>

        {/* Right: account links */}
        <div className="flex items-center gap-6">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-[#00A8E8]"
          >
            <User className="size-4" />
            Profile
          </Link>

          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    className="rounded-full p-0.5 border-2 border-[#00A8E8]/40 hover:border-[#00A8E8] hover:shadow-md hover:shadow-[#00A8E8]/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A8E8]"
                  >
                    <Avatar className="size-10 cursor-pointer">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user?.image || undefined}
                        alt={user?.name || "User"}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-[#00A8E8]/10 text-[#00A8E8] font-semibold">
                      </AvatarFallback>
                    </Avatar>
                  </button>
                }
              />

              <PopoverContent
                align="end"
                className="w-64 rounded-xl p-4 shadow-lg"
              >
                <PopoverHeader>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-11 border">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user?.image || undefined}
                        alt={user?.name || "User"}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-[#00A8E8]/10 text-[#00A8E8] font-semibold">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <PopoverTitle className="text-sm font-semibold">
                        {user?.name}
                      </PopoverTitle>
                      <PopoverDescription className="truncate text-xs">
                        {user?.email}
                      </PopoverDescription>
                    </div>
                  </div>
                </PopoverHeader>

                <div className="my-3 border-t" />

                <Button
                  onClick={handleSignout}
                  variant="destructive"
                  className="w-full"
                >
                  Sign Out
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-foreground transition-colors hover:text-[#00A8E8]"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-sm text-foreground transition-colors hover:text-[#00A8E8]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
