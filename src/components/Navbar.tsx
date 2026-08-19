
"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/store/CartProvider";

export default function Navbar() {
  const [search, setSearch] = useState("");
//   const [cartCount] = useState(0);
  const { cartCount } = useCart();
  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <Link href="/" className="navbar-logo">
          <span className="navbar-logo-mark">V</span>
          <span>VRUKSHA ORGANICS</span>
        </Link>

        {/* SEARCH */}
        <div className="navbar-search">
          <input
            type="search"
            placeholder="Search organic products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="button" aria-label="Search">
            🔍
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="navbar-links">
          <Link href="/">HOME</Link>
          <a href="#categories">CATEGORIES</a>
          <a href="#offers">OFFERS</a>
          <a href="#about">ABOUT</a>
        </nav>

        {/* ACTIONS */}
        <div className="navbar-actions">

          <button type="button" className="navbar-login">
            ♙
            <span>LOGIN</span>
          </button>

      <Link
  href="/cart"
  className="navbar-cart"
>
  🛒
  <span className="cart-count">
    {cartCount}
  </span>
</Link>

        </div>

      </div>
    </header>
  );
}

