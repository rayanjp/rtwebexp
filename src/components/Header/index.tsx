"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import menuData from "./menuData";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY >= 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setNavbarOpen(false); }, [pathname]);

  return (
    <header
      className={[
        "header top-0 left-0 z-[9999] flex w-full items-center transition-all duration-300",
        sticky
          ? "fixed backdrop-blur-md shadow-[0_6px_24px_rgba(2,6,23,.06)]"
          : "absolute",
        // glassy white when sticky, fully transparent on hero
        sticky ? "bg-white/80" : "bg-transparent",
        sticky ? "py-0" : "py-1",
      ].join(" ")}
    >
      {/* hairline */}
      <div
        aria-hidden
        className={[
          "pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-300",
          "bg-[linear-gradient(90deg,rgba(2,6,23,0),rgba(2,6,23,.08),rgba(2,6,23,0))]",
          sticky ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          {/* Logo (keeps your smooth shrink) */}
          <div className="w-70 max-w-full px-4 xl:mr-12">
            <Link
              href="/"
              className={[
                "header-logo block w-full rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                sticky ? "py-2" : "py-4",
              ].join(" ")}
              aria-label="Rayan Trading Home"
            >
              <span
                className={[
                  "inline-block origin-left transition-transform duration-300 ease-out",
                  sticky ? "scale-[0.85]" : "scale-100",
                ].join(" ")}
              >
                <Image
                  src="/images/logo/logo_light.png"
                  alt="logo"
                  width={160}
                  height={34}
                  priority
                />
              </span>
            </Link>
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center justify-end px-4">
            {/* Mobile toggle */}
            <button
              onClick={() => setNavbarOpen((s) => !s)}
              id="navbarToggler"
              aria-label="Toggle navigation"
              aria-expanded={navbarOpen}
              aria-controls="navbarCollapse"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-2 lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <span className={["block h-0.5 w-7 bg-[var(--rt-ink)] transition-all", navbarOpen ? "translate-y-[6px] rotate-45" : ""].join(" ")} />
              <span className={["mt-1 block h-0.5 w-7 bg-[var(--rt-ink)] transition-opacity", navbarOpen ? "opacity-0" : "opacity-100"].join(" ")} />
              <span className={["mt-1 block h-0.5 w-7 bg-[var(--rt-ink)] transition-all", navbarOpen ? "-translate-y-[6px] -rotate-45" : ""].join(" ")} />
            </button>

            {/* Mobile overlay */}
            {navbarOpen && (
              <button
                className="fixed inset-0 z-20 block lg:hidden cursor-default"
                aria-hidden="true"
                onClick={() => setNavbarOpen(false)}
              />
            )}

            {/* Nav: transparent on desktop (FIX for dark pill issue) */}
            <nav
              id="navbarCollapse"
              className={[
                "navbar absolute right-4 z-30 w-[260px] rounded-lg border border-[rgba(2,6,23,.08)] bg-white/95 p-4 backdrop-blur-md",
                "transition-all duration-300",
                navbarOpen
                  ? "visible top-[calc(100%+12px)] opacity-100"
                  : "invisible top-[calc(100%+24px)] opacity-0",
                // desktop: NO background, NO border, NO padding (so links have no pill behind them)
                "lg:visible lg:static lg:w-auto lg:border-0 lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg:backdrop-blur-0",
              ].join(" ")}
            >
              <ul className="block lg:flex lg:items-center lg:space-x-10">
                {menuData.map((menuItem, index) => {
                  const isActive = menuItem.path && pathname === menuItem.path;
                  return (
                    <li key={index} className="group relative">
                      <Link
                        href={menuItem.path}
                        onClick={() => setNavbarOpen(false)}
                        className={[
                          "relative flex py-2 text-base lg:inline-flex lg:px-0",
                          sticky ? "lg:py-3" : "lg:py-6",
                          isActive
                            ? "text-[var(--rt-ink)]"
                            : "text-[var(--rt-ink)]/80 hover:text-[var(--rt-ink)]",
                          "transition-colors duration-200",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "relative inline-block",
                            "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[var(--rt-primary)] after:content-[''] after:transition-[width] after:duration-300",
                            "after:w-0 group-hover:after:w-full focus-visible:after:w-full",
                          ].join(" ")}
                        >
                          {menuItem.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
