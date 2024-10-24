"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LuAlignJustify, LuX } from "react-icons/lu";

function MobileNav({ session }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleToggle() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="block md:hidden">
        <button onClick={handleToggle}>
          {isMobileMenuOpen ? (
            <LuX className="text-2xl" />
          ) : (
            <LuAlignJustify className="text-2xl" />
          )}
        </button>
      </div>

      <div
        className={`absolute left-0 top-24 z-50 flex w-full transform cursor-pointer items-center justify-center bg-primary-900 py-5 transition-transform md:hidden ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
        style={{ transition: "transform 0.3s ease, opacity 0.3 ease" }}
      >
        <ul className="flex flex-col items-center gap-5">
          <li>
            <Link
              href="/cabins"
              className="transition-colors hover:text-accent-400"
            >
              Cabins
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="transition-colors hover:text-accent-400"
            >
              About
            </Link>
          </li>
          <li>
            {session?.user.image ? (
              <Link
                href="/account"
                className="flex items-center gap-4 transition-colors hover:text-accent-400"
              >
                <img
                  src={session.user.image}
                  className="h-8 rounded-full"
                  alt={session.user.name}
                  referrerPolicy="no-referrer"
                />
                <span>Guest Area</span>
              </Link>
            ) : (
              <Link
                href="/account"
                className="transition-colors hover:text-accent-400"
              >
                Guest area
              </Link>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

export default MobileNav;
