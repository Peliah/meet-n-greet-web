"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/hooks/use-auth-store";
import { NeoButton } from "../ui/neo-button";
import { buttonVariants } from "@/lib/animations";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function NavigationMenu() {
  const pathname = usePathname();
  const { isAuthenticated, logout, isAdmin } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const adminNav = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/events", label: "Manage Events" },
  ];

  const clientNav = [
    { href: "/events", label: "Events" },
    { href: "/profile", label: "My Bookings" },
  ];

  const navItems = isAdmin() ? adminNav : clientNav;

  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-black">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-extrabold text-2xl">
            MEET-N<span className="text-yellow-400">-GREET</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-bold text-lg relative ${pathname === item.href
                ? "text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-yellow-400"
                : "text-gray-700 hover:text-black"
                }`}
            >
              {item.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <button
                onClick={() => logout()}
                className="font-bold text-lg text-gray-700 hover:text-black"
              >
                Logout
              </button>
            </motion.div>
          ) : (
            <Link href="/login">
              <NeoButton variant="primary">Login</NeoButton>
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X size={24} className="text-black" />
          ) : (
            <Menu size={24} className="text-black" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t-4 border-black"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-bold text-lg ${pathname === item.href
                  ? "text-black"
                  : "text-gray-700 hover:text-black"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="font-bold text-lg text-gray-700 hover:text-black"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="inline-block"
              >
                <NeoButton variant="primary">Login</NeoButton>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}