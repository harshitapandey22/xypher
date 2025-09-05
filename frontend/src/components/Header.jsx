import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { IoMdTrendingUp } from "react-icons/io";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home",     href: "#home"     },
    { name: "About",    href: "#about"    },
    { name: "Features", href: "#features" },
    { name: "Contact",  href: "#contact"  },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-[var(--bg)]/60 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] p-2 rounded-lg">
            <IoMdTrendingUp className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
            CapitaClarity
          </span>
        </Motion.div>

        {/* Desktop Nav + Theme Toggle */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, idx) => (
            <Motion.a
              key={item.name}
              href={item.href}
              className="text-[var(--fg)] hover:text-[var(--primary)] font-medium transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {item.name}
            </Motion.a>
          ))}
          <Link
            to="/auth"
            className="bg-[var(--primary)] text-white px-5 py-2 rounded-lg font-medium hover:scale-[1.05] transition-transform"
          >
            Login
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[var(--fg)]"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <MdMenuOpen size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Panel */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[var(--bg)] shadow-lg">
          <ul className="flex flex-col space-y-4 p-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="block text-[var(--fg)] hover:text-[var(--primary)] text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/auth"
                className="block bg-[var(--primary)] text-white text-center px-4 py-2 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </li>
            <li className="pt-2">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      )}
    </header>
);
}