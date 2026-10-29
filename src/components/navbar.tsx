"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { logoFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";

type NavLink = {
  label: string;
  href: string;
  withIcon?: boolean;
};

const NAV_LINKS: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Add Destination", href: "/add-destination"}
] as const;

const AUTH_LINKS: readonly NavLink[] = [
  { label: "Profile", href: "/profile", withIcon: true },
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
] as const;

function navLinkClassName(active: boolean, inDrawer = false) {
  return cn(
    "text-[15px] text-muted-foreground transition-colors hover:text-brand",
    active && "font-medium text-brand underline underline-offset-4 decoration-1",
    inDrawer && "rounded-md px-2.5 py-2 hover:bg-muted hover:text-foreground"
  );
}

export function Navbar() {
  const pathname = usePathname();

  const renderLink = (link: NavLink) => (
    <>
      {link.withIcon && <User className="size-4 shrink-0" aria-hidden="true" />}
      <span>{link.label}</span>
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <nav
        aria-label="Main Navigation"
        className="relative flex h-14 w-full items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Left: primary links (desktop) */}
        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block py-1 text-[15px] text-foreground/80 transition-colors hover:text-brand",
                    active && "font-medium text-brand underline underline-offset-4 decoration-1"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Left: mobile menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle
                  className={cn(
                    logoFont.className,
                    "text-xl tracking-tight text-brand"
                  )}
                >
                  Wanderlust
                </SheetTitle>
              </SheetHeader>
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-1 px-4 pb-4"
              >
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <SheetClose
                      key={link.href}
                      render={
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          className={navLinkClassName(active, true)}
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  );
                })}
                <Separator className="my-3" />
                {AUTH_LINKS.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        className={cn(
                          navLinkClassName(false, true),
                          "flex items-center gap-2"
                        )}
                      />
                    }
                  >
                    {renderLink(link)}
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Center: logo */}
        <Link
          href="/"
          className={cn(
            logoFont.className,
            "absolute left-1/2 -translate-x-1/2 text-2xl tracking-tight text-brand transition-opacity hover:opacity-90"
          )}
        >
          Wanderlust
        </Link>

        {/* Right: auth links (desktop) */}
        <ul className="ml-auto hidden items-center gap-6 lg:flex">
          {AUTH_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center gap-1.5 text-[15px] text-foreground/80 transition-colors hover:text-brand"
              >
                {link.withIcon && (
                  <User className="size-4" aria-hidden="true" />
                )}
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
